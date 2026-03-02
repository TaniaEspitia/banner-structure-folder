document.addEventListener("DOMContentLoaded", function () {
    // clickTag: set CTA href for HTML5 ad platforms (ad server usually provides window.clickTag)
    var cta = document.getElementById("f7_cta");
    if (cta && typeof window.clickTag === "string") cta.href = window.clickTag;

    // Build three scrolling columns for Frame 1 using JS only (no CSS changes)
    const tickerList = document.getElementById("ticker_list");
    const columnLabels = ["Men's", "Mental", "Health"];
    let columns = [];

    if (tickerList) {
        // Replace existing content with three logical columns
        tickerList.innerHTML = "";
        columnLabels.forEach((label) => {
            const col = document.createElement("div");
            col.classList.add("ticker_col");
            for (let i = 0; i < 15; i++) {
                const span = document.createElement("span");
                span.classList.add("ticker_item", "text");
                span.textContent = label;
                col.appendChild(span);
            }
            tickerList.appendChild(col);
        });

        columns = gsap.utils.toArray(".ticker_col");
        // Layout columns: each column starts after the previous one's width + gap
        const gap = 8;
        let offsetX = 0;
        columns.forEach((col) => {
            gsap.set(col, {
                position: "absolute",
                left: 0,
                bottom: -20,
                x: offsetX,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                autoAlpha: 0,
            });
            offsetX += col.offsetWidth + gap;
        });
    }

    const tl = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        repeatDelay: 1,
        defaults: { ease: "power2.out", duration: 0.45 },
    });

    // Layer management: keep Frames 3–6 hidden (autoAlpha: 0) so nothing shows behind Frame 2
    tl.set("#frame_3", { autoAlpha: 0, pointerEvents: "none" })
        .set(["#line_1", "#line_2", "#line_3"], { y: 30, autoAlpha: 0 })
        .set("#circle", { scale: 0 })
        .set("#frame_4", { autoAlpha: 0, pointerEvents: "none" })
        .set(["#f4_l1", "#f4_l2", "#f4_l3", "#f4_l4", "#f4_l5"], { y: 30, autoAlpha: 0 })
        .set("#frame_5", { autoAlpha: 0, pointerEvents: "none" })
        .set(["#f5_l1", "#f5_l2", "#f5_l3", "#f5_l4"], { y: 30, autoAlpha: 0 })
        .set("#f5_cigna", { autoAlpha: 0 })
        .set("#frame_6", { autoAlpha: 0, pointerEvents: "none" })
        .set("#f6_main_logo", { y: 30, autoAlpha: 0 })
        .set("#f6_bottom_text", { y: 30, autoAlpha: 0 })
        .set("#f6_cigna_white", { autoAlpha: 1 })
        .set("#f7_cta", { autoAlpha: 0 });

    if (columns.length) {
        tl.set(columns, { autoAlpha: 0, y: 40 });
        // Frame 1: multi-column staggered scroll to aligned baseline (Men's, Mental, Health)
        tl.to(columns[0], { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
            .to(columns[1], { autoAlpha: 1, y: 0, duration: 0.5 }, 0.2)
            .to(columns[2], { autoAlpha: 1, y: 0, duration: 0.5 }, 0.4)
            .to({}, { duration: 0.1 }); // Dwell after columns align
    }

    // Frame 2: Central circle scales to clear the frame
    tl.set("#circle", { scale: 0 })
        .fromTo("#circle", { scale: 0 }, { scale: 12, duration: 0.5, ease: "power2.inOut" });

    // Frame 3: show white frame and reveal text from bottom to top
    tl.set("#frame_3", { autoAlpha: 1, pointerEvents: "auto" })
        .fromTo("#line_1", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, "+=0.1")
        .fromTo("#line_2", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.3")
        .fromTo("#line_3", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.3")
        .to({}, { duration: 2 }); // Dwell: Frame 2 (2s)

    // Transition 2→3: Staggered exit (bottom-to-top), then full fade out of frame 2
    tl.to(["#line_1", "#line_2", "#line_3"], { y: -40, autoAlpha: 0, duration: 0.4, stagger: 0.08 })
        .to("#frame_3", { autoAlpha: 0, duration: 0.2, ease: "power2.inOut" }, "-=0.15");

    // Frame 3 Refinement: fade in frame, then line-by-line bottom-to-top
    tl.set("#frame_4", { autoAlpha: 0, pointerEvents: "auto" })
        .to("#frame_4", { autoAlpha: 1, duration: 0.3 })
        .fromTo("#f4_l1", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "+=0.1")
        .fromTo("#f4_l2", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.3")
        .fromTo("#f4_l3", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.3")
        .fromTo("#f4_l4", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.3")
        .fromTo("#f4_l5", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.3")
        .to({}, { duration: 2 }); // Dwell: Frame 3 (2s)

    // Transition 4→5: Staggered exit of frame 4 lines, then full fade out of frame 4
    tl.to(["#f4_l1", "#f4_l2", "#f4_l3", "#f4_l4", "#f4_l5"], { y: -40, autoAlpha: 0, duration: 0.35, stagger: 0.08 })
        .to("#frame_4", { autoAlpha: 0, duration: 0.5 }, "-=0.15")
        .set("#frame_5", { autoAlpha: 1, pointerEvents: "auto" })
        .fromTo("#f5_l1", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "+=0.1")
        .fromTo("#f5_l2", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.3")
        .fromTo("#f5_l3", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.3")
        .fromTo("#f5_l4", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, "-=0.3")
        .to("#f5_cigna", { autoAlpha: 1, duration: 1 }, "-=1")
        .to({}, { duration: 2 }); // Dwell: Frame 4 (2s)

    // Frame 5/6: Background_man — Visibility Logo + Bottom Content (text + CTA in same frame)
    tl.to("#frame_5", { autoAlpha: 0, duration: 0.4 })
        .set("#frame_6", { autoAlpha: 1, pointerEvents: "auto" }, "-=0.2")
        .set("#f6_cigna_white", { autoAlpha: 1 }) // static, no animation
        .fromTo("#f6_main_logo", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "+=0.15")
        .fromTo("#f6_bottom_text", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "+=0.2")
        .to({}, { duration: 2 }) // Dwell with text visible
        .to("#f6_bottom_text", { autoAlpha: 0, duration: 0.5 })
        .to("#f7_cta", { autoAlpha: 1, duration: 1 }, "-=0.2"); // hide text, show CTA
});
