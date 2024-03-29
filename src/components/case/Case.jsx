import React, { useRef, useState } from 'react';
import { Image, useIntersect, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, config } from 'react-spring';
import * as THREE from 'three';

import './style.css';

export const CaseText = () => {
    const [hover, setHover] = useState(false);

    const style = useSpring({
        fontSize: hover ? "1.9rem" : '2rem',
        opacity: hover ? 0.8 : 1,
        config: config.wobbly
    });


    return (
        <section className='case'>
            <h1 className="heading">CASE</h1>
            <h2 className="sub-heading">ケース</h2>
            <div className="case-content">
                <p> 弊社では、眉毛サロンを経営しております。</p>
                <p> 名古屋市内行きたいランキング500に選ばれた店舗になります。</p>
                <animated.button className="btn case-btn" style={style} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>VIEW MORE</animated.button>
            </div>
        </section>
    )
}

export const CaseImage = () => {
    const { width, height } = useThree((state) => state.viewport);

    const data = useScroll();
    const visible = useRef(false);
    const ref = useIntersect((isVisible) => (visible.current = isVisible));

    const c = new THREE.Color();
    useFrame((state, delta) => {
        ref.current.material.opacity = THREE.MathUtils.damp(ref.current.material.opacity, visible.current ? 1 : 0, 1, delta);
        ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, 1 + (1 - data.range(2 / 3, 1 / 3)) / 3, 4, delta);
        ref.current.material.color.lerp(c.set(visible.current ? "#ffffff" : "#ccc"), visible.current ? 0.4 : 0.05);
        if (state.viewport.width < 12.42) {
            if (state.viewport.width < 9.6) {
                ref.current.position.y = -state.viewport.height * 3.0;
            }
            else ref.current.position.y = -state.viewport.height * 2.8;
        }
        else {
            ref.current.position.y = -state.viewport.height * 3.0;
        }
    })

    return (
        <group>
            <Image ref={ref} transparent url="/assets/img/case-bg.jpg" position={[0, 0, -5]} scale={[width, height * 7 / 10, 0]} />
        </group>
    )
}


const GalleryItem = ({ scale, url, opacity, ...props }) => {

    const visible = useRef(false);
    const ref = useIntersect((isVisible) => (visible.current = isVisible))
    const { height } = useThree((state) => state.viewport);

    useFrame((state, delta) => {
        if (opacity) ref.current.material.opacity = opacity;
        ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 1 : -height / 8, 4, delta);
        ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.3, 4, delta);

    })

    return (
        <group {...props}>
            <Image ref={ref} scale={scale} url={url} />
        </group>
    )

}

export const CaseGallery = () => {
    const { width: w, height: h } = useThree((state) => state.viewport);
    const [select, setSelect] = useState(null);
    const ref = useRef();


    return (
        <group ref={ref}>

            <GalleryItem url='/assets/img/Ulysses.jpg' position={w > 12.45 ? [-w / 4, -h * 4 + 5, -5] :
                w > 9.6 ? [0, -(h > 11.5 ? h : h > 11 ? 11.4 : 11) * 4, -4] :
                    w > 5.875 ? [0, -(h > 11.5 ? h : h > 11 ? 11.4 : 11) * 3.7, -4] :
                        w > 5 ? [0, -(h > 11.5 ? h : h > 11 ? 11.4 : 11) * 3.9, -4] :
                            [0, -(h > 11.5 ? h : h > 11 ? 11.4 : 11) * 4.1, -4]} scale={w > 12.45 ? [w / 2.5, h / 1.5, 0] : [w - 0.8, h / 4, 0]} />
            <GalleryItem url='/assets/img/Ulysses01.jpg' position={[10, -40, -3]} scale={[3, 3, 0]} transparent />
            <GalleryItem url='/assets/img/Ulysses02.jpg' position={[8.6, -45.5, -5]} scale={[3, 3, 0]} opacity={0.8} />
            {/* <Image url='/assets/img/Ulysses03.jpg' position={[-w / 4, -h * 5 - 2, -5]} scale={[w / 6, h / 4, 0]}></Image> */}
        </group>
    )
}
