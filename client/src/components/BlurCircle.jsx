import React, { useEffect, useRef, useState } from 'react'

const BlurCircle = ({ top = "auto", left = "auto", right = "auto", bottom = "auto", mode = 'static' }) => {
    const followCursor = mode === 'cursor'
    const circleRef = useRef(null)

    // Cursor position
    const mouse = useRef({ x: 0, y: 0 })
    const position = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (!followCursor) return

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY }
        }

        const lerp = (start, end, factor) => start + (end - start) * factor

        const animate = () => {
            position.current.x = lerp(position.current.x, mouse.current.x, 0.1)
            position.current.y = lerp(position.current.y, mouse.current.y, 0.1)

            if (circleRef.current) {
                circleRef.current.style.transform = `translate3d(${position.current.x - 40}px, ${position.current.y - 40}px, 0)`
            }

            requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', handleMouseMove)
        requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [followCursor])

    // Static positioning (if not cursor mode)
    const staticStyle = !followCursor ? {
        top,
        left,
        right,
        bottom,
    } : {}

    const cursorStyle = "fixed pointer-events-none -z-50 h-[80px] w-[80px] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(248,69,101))] transition-all duration-300 ease-out"
    const staticBlurStyle = "absolute -z-50 h-58 w-58 aspect-square rounded-full bg-primary/30 blur-3xl"

    return (
        <div
            className={followCursor ? cursorStyle : staticBlurStyle}
            style={staticStyle}
            ref={circleRef}
        >
        </div>
    )
}

export default BlurCircle