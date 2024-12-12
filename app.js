const magicAreas = [...document.querySelectorAll(".c-magic-area")];

const getAreaDetails = (area) => {
    const width = area.clientWidth;
    const height = area.clientHeight;

    const position = area.getBoundingClientRect();
    const top = position.top + window.scrollY;
    const left = position.left;
    return {
        left,
        height,
        top,
        width
    };
};

const setTweenArea = (link, magicArea) => {
    const { left, height, top, width } = getAreaDetails(link);

    gsap.set(magicArea, {
        top,
        left,
        width,
        height
    });
};

const tweenMagicArea = (target, magicArea) => {
    const { left, height, top, width } = getAreaDetails(target);

    gsap.to(magicArea, 0.5, {
        left,
        top,
        width,
        height,
        ease: Power3.easeInOut
    });
};

const getMagicActiveElement = (links) => {
    return links.filter((link) => {
        return (
            link.classList.contains("is-magic-active") ||
            link.getAttribute("aria-current") === "page"
        );
    });
};

const moveMagicArea = (links, magicArea, isTweenBack) => {
    const magicActiveElement = getMagicActiveElement(links);

    links.map((link) => {
        link.addEventListener("mouseenter", function (e) {
            tweenMagicArea(e.target, magicArea);
        });

        link.addEventListener("focus", function (e) {
            tweenMagicArea(e.target, magicArea);
        });

        if (isTweenBack && magicActiveElement.length) {
            link.addEventListener("mouseleave", function (e) {
                tweenMagicArea(magicActiveElement[0], magicArea);
            });

            link.addEventListener("focusout", function (e) {
                tweenMagicArea(magicActiveElement[0], magicArea);
            });
        }
    });
};

const setMagic = (links, magicArea) => {
    // check if .is-magic-active || aria-current="page"
    const magicActiveElement = getMagicActiveElement(links);

    if (magicActiveElement.length) {
        setTweenArea(magicActiveElement[0], magicArea);
    } else {
        setTweenArea(links[0], magicArea);
    }
};

// const onResize = (links, magicArea) => {
//   setMagic(links, magicArea);
// };

const initMagic = ({ isResize } = { isResize: false }) => {
    if (!magicAreas.length) return;

    magicAreas.map((magicArea) => {
        const targetMagicArea = magicArea.getAttribute("data-target-class");

        const links = [...document.querySelectorAll(targetMagicArea)];

        if (!links.length) return;

        setMagic(links, magicArea);

        if (!isResize) {
            const isTweenBack = magicArea.getAttribute("data-tween-back") === "true";

            moveMagicArea(links, magicArea, isTweenBack);
        }
    });
};

initMagic();

window.addEventListener(
    "resize",
    _.throttle(function () {
        initMagic({ isResize: true });
    }, 100)
);

VanillaTilt.init(document.querySelector(".c-fe30__inner"), {
    max: 20,
    perspective: 1000,
    speed: 300
});

var modalContent = [
    {

    },
    {
        title: "The Harsh Realities",
        content: [
            `"African American students are less likely than white students to have access to college-ready courses." - UNCF`,
            `"African American students are often located in schools with less qualified teachers, teachers with lower salaries and novice teachers." - UNCF`,
            `"Schools with 90 percent or more students of color spend $733 less per student per year than schools with 90 percent or more white students." - UNCF`,
            `"Students of color are suspended at disproportionately higher rates than white students and, on average, perform more poorly on standardized tests." - Standford`,

        ]
    }
]

$(document).on('ready', function () {
    $modal = $('.modal-frame');
    $overlay = $('.modal-overlay');

    /* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
    $modal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
        if ($modal.hasClass('state-leave')) {
            $modal.removeClass('state-leave');
        }
    });

    $('.close').on('click', function () {
        $overlay.removeClass('state-show');
        $modal.removeClass('state-appear').addClass('state-leave');
    });

    $('.open').on('click', function () {
        $overlay.addClass('state-show');
        $('#audio').hide();
        $modal.removeClass('state-leave').addClass('state-appear');
        if ($(this).attr('data-section') === 'audio') {
            $modal.children('.modal').children('.modal-inset').children('.modal-body').html(`
                    <img class="picSize" src="./images/americorps.jpg" alt="AmeriCorps NCCC Team Water 6">
                    <p><i>Myself (Top Back Left) and the rest of Water 6 preparing for deployment to Kansas City to support the W.E.B. DuBois Learning Center</i></p>
                    <hr>
                    <h3>My experience in Kansas City</h3>
                    <audio id="audio" controls>
                        <source src="./My Story.mp3" type="audio/mpeg" />    
                    </audio>
            `)
        } else if ($(this).attr('data-section') === 'research') {
            var { title: postTitle, content: postContent } = modalContent[1]
            $modal.children('.modal').children('.modal-inset').children('.modal-body').html(`
            <h3>${postTitle}</h3>
            <p><i>${postContent[0]}</i></p>
            <p><i>${postContent[1]}</i></p>
            <p><i>${postContent[2]}</i></p>
            <p><i>${postContent[3]}</i></p>
            `)
        } else if ($(this).attr('data-section') === 'action') {
            $modal.children('.modal').children('.modal-inset').children('.modal-body').html(`
                <h3>You CAN make a difference!</h3>
                <p>Obviously I would <i>LOVE</i> to recommend each of you enlist in AmeriCorps, the experience was very formative for me and gave me so much perspective. If you want to get some hands on intervention and participation in mitigating the problem I cannot recommend it enough, especially to young adults who can enroll in the National Civilian Community Corps (NCCC). That said, AmeriCorps addresses many things so let's talk about what we can all do to specifically address disparities in resources for ethnic minorities in urban school systems.</p>
                <p>The first and most important thing to do is to educate yourself. Reading articles and doing your own research, but most importantly starting a dialogue with the people in your own life about what is really going on. Information and knowledge should be shared, so taking what you learned on this site and what you've learned elsewhere into the world will just help immensely.</p>
                <p>Secondly, you can vote. VOTE VOTE VOTE VOTE VOTE. Especially locally. Being and advocate for policy change and calling your representatives is crucial and will affect the most institutional change possible</p>
                <p>Lastly you can donate your time and resources. Organizations like Teach for America, Children's Defense Fund, and DonorsChoose all need funding and support to help foster better educations for every student, especially those most impacted by the institutionalized racism of the education system.</p>
                <p>Overall, all I can say is do what you can and always be thankful for the blessings you've had in life. This issue as you can tell is very personal to me, and I am so happy I got the chance to experience what I did and work on a project like this to let others know about how real this issue really is.</p>
                <p><i>- Quinton Fults</i></p>
                `)
        } else {
            $modal.children('.modal').children('.modal-inset').children('.modal-body').html(`
                <h3>Where do those statistics come from?</h3>
                <p>Standford Education (Peer Reviewed) | <a href="https://ed.stanford.edu/news/racial-disparities-school-discipline-are-linked-achievement-gap-between-black-and-white?">Read more here</a></p>
                <p>United Negro College Fund (UNCF) | <a href="https://uncf.org/pages/K-12-Disparity-Facts-and-Stats?">Read more here</a></p>
                `)
        }
    });

});
