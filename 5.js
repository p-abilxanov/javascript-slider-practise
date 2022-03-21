class Slider {
    constructor(arg) {
        this.slider = arg.slider;
        this.sliderWidth = arg.sliderWidth;
        this.sliderHeight = arg.sliderHeight;
        this.transition = arg.transition;
        this.slidesToShow = arg.slidesToShow;
        this.slidesToScroll = arg.slidesToScroll;
        this.margin = arg.margin;
        this.arrow = arg.arrow;
        this.dots = arg.dots;
    }

    start() {
        const sliderLink = document.querySelector(this.slider);
        const sliderItem = document.querySelectorAll(`${this.slider} .slider__item`); // COUNT SLIDE

        // add style to each list
        for (const item of sliderItem) {
            let i = sliderItem.length;
            item.style.display = 'block';
            item.style.width = `${(this.sliderWidth) / this.slidesToShow  - (this.margin * 2)}px`;
            item.style.height = '100%';
            item.style.transform = 'translateX(100px) translateZ(-100px) scaleX(.8) scaleY(.7)';
            item.style.zIndex = `-${i}`;
            item.style.margin = `0 ${this.margin}px`;
        }

        const sliderItemHTML = sliderLink.innerHTML;
        const sliderBlock = document.createElement('DIV');

        sliderLink.style.width = `${this.sliderWidth}px`;
        sliderLink.style.height = `${this.sliderHeight}px`;
        sliderLink.style.display = 'flex';
        sliderLink.innerHTML = "";
        sliderBlock.classList = 'slider-block';
        sliderBlock.style.display = 'flex';
        sliderBlock.style.transition = `transform ${this.transition}ms`;
        sliderBlock.innerHTML = sliderItemHTML;
        sliderLink.appendChild(sliderBlock);

        // ADD DOTS
        if (this.dots) {
            const dotsDIV = document.createElement('DIV');
            dotsDIV.classList = 'dots-block';

            const dotsUL = document.createElement('UL');
            dotsUL.classList = 'dots-list';

            sliderLink.parentElement.appendChild(dotsDIV);
            dotsDIV.appendChild(dotsUL);

            var countDots = Math.ceil((sliderItem.length - this.slidesToScroll) / this.slidesToShow + 1);

            // ADD LI AND DOTS
            for (let i = 0; i < countDots; i++) {
                const dotsLI = document.createElement('LI');
                dotsLI.classList = 'dots-item';

                const dotsBTN = document.createElement('INPUT');
                dotsBTN.setAttribute('type', 'radio');
                dotsBTN.setAttribute('name', 'dots-btn');
                dotsBTN.setAttribute('id', 'dots-btn');

                dotsLI.appendChild(dotsBTN);
                dotsUL.appendChild(dotsLI);
            }
        }

        // ADD BUTTON
        if (this.arrow) {
            const prevBTN = document.createElement('BUTTON');
            prevBTN.classList = 'prev-btn arrow-btn';
            sliderLink.parentElement.appendChild(prevBTN);

            const nextBTN = document.createElement('BUTTON');
            nextBTN.classList = 'next-btn arrow-btn';
            sliderLink.parentElement.appendChild(nextBTN);
        }
    }

    showSlide(n) {
        // DISABLED BUTTON
        if (n == 0) {
            document.querySelector('.prev-btn').disabled = true;
            document.querySelector('.prev-btn').classList.add('disabled-btn');
        } else {
            document.querySelector('.prev-btn').disabled = false;
            document.querySelector('.prev-btn').classList.remove('disabled-btn');
        }

        if (n == document.querySelectorAll('#dots-btn').length - 1) {
            document.querySelector('.next-btn').disabled = true;
            document.querySelector('.next-btn').classList.add('disabled-btn');
        } else {
            document.querySelector('.next-btn').disabled = false;
            document.querySelector('.next-btn').classList.remove('disabled-btn');
        }

        if (n == 0) {
            for (let i = n + 1; i < document.querySelectorAll('#dots-btn').length; i++) {
                document.querySelectorAll(".slider__item")[i].style.transform =
                    `translateX(100px) translateZ(-100px) scaleX(.8) scaleY(.7)`;
                document.querySelectorAll(".slider__item")[i].style.zIndex =
                    `${-i}`;
            }
        } else if (n == document.querySelectorAll('#dots-btn').length - 1) {
            for (let i = n - 1; i >= 0; i--) {
                document.querySelectorAll(".slider__item")[i].style.transform =
                    `translateX(-100px) translateZ(-100px) scaleX(.8) scaleY(.7)`;
                document.querySelectorAll(".slider__item")[i].style.zIndex =
                    `${i}`;
            }
        } else {
            for (let i = n - 1; i >= 0; i--) {
                document.querySelectorAll(".slider__item")[i].style.transform =
                    `translateX(-100px) translateZ(-100px) scaleX(.8) scaleY(.7)`;
                document.querySelectorAll(".slider__item")[i].style.zIndex =
                    `${i}`;
            }
            for (let i = n + 1; i < document.querySelectorAll('#dots-btn').length; i++) {
                document.querySelectorAll(".slider__item")[i].style.transform =
                    `translateX(100px) translateZ(-100px) scaleX(.8) scaleY(.7)`;
                document.querySelectorAll(".slider__item")[i].style.zIndex =
                    `${-i}`;
            }
        }

        document.querySelectorAll(".slider__item")[n].style.transform =
            `translateX(0) translateZ(0) scale(1)`;
        document.querySelectorAll(".slider__item")[n].style.zIndex =
            `${document.querySelectorAll('#dots-btn').length}`;

        const sliderItems = document.querySelectorAll('.slider__item');
        sliderItems[n].classList.add('active-slide');
        sliderItems.forEach((item, i) => {
            if (i != n) {
                item.classList.remove('active-slide');
            }
        });
        if (this.dots) {
            document.querySelectorAll('#dots-btn')[n].checked = true;

            var countDotsItem = document.querySelectorAll('.dots-item');
            countDotsItem[n].classList.add('active-dots');

            countDotsItem.forEach((element, i) => {
                if (i != n) {
                    element.classList.remove('active-dots');

                }
            });
        }
    }
};

var slideIndex = 0;

let slide = new Slider({
    slider: '.slider',
    sliderWidth: 400,
    sliderHeight: 400,
    transition: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    margin: 5,
    arrow: true,
    dots: true
});

slide.start();
slide.showSlide(0);

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
if (slide.dots) var countBtn = document.querySelectorAll('#dots-btn');
if (slide.arrow) {
    prevBtn.addEventListener('click', function () {
        slideIndex--;
        slide.showSlide((slideIndex + countBtn.length) % countBtn.length);
    });
    nextBtn.addEventListener('click', function () {
        slideIndex++;
        slide.showSlide((slideIndex + countBtn.length) % countBtn.length);
    });
}

if (slide.dots) {
    countBtn.forEach((item, i) => {
        item.addEventListener('click', function () {
            slideIndex = i;
            slide.showSlide(slideIndex);
        })
    })
}