class Banner {

    constructor(opt) {
        this.$banner = document.getElementById(opt.box);
        //前后添加元素
        this.imgs = opt.imgs;
        //创建dom
        this.$ul = this.createDom();
        this.index = 0;
        this.ulLength = this.$ul.children.length;
        /**
         * x,y用来记录一共移动了多少距离
         */
        this.x = 0;
        this.y = 0;
        this.disX = 0;
        this.disY = 0;
        this.startX = 0;
        this.startY = 0;
        this.lOffsetWidth = this.$ul.children[0].offsetWidth;
        this.position();
        this.setEventListener();
        if(opt.autoPlay){
            this.autoScroll();
        }
    }

    autoScroll() {

        setInterval(() => {
            this.x = -(++this.index) * this.lOffsetWidth;
            this.ulTranslateXAnim();
            this.match();
            console.log('当前index=', this.index);
        }, 2000);
    }

    /**
     * 设置轮播图位置
     */
    position() {
        this.x = -this.lOffsetWidth;
        this.ulTranslateXNoAnim();
        this.index = 1;
    }

    ulTranslateX() {
        this.$ul.style.transform = `translateX(${this.x}px)`;
    }

    ulTranslateXNoAnim() {
        this.$ul.style.transition = '';
        this.ulTranslateX();
    }

    ulTranslateXAnim() {
        this.$ul.style.transition = 'all 0.5s ease';
        this.ulTranslateX();
    }

    setEventListener() {
        const banner = this.$banner;

        //鼠标按下
        banner.addEventListener('touchstart', (e) => {
            this.touchStart(e);
        }, false);

        //鼠标移动
        banner.addEventListener('touchmove', (e) => {
            this.touchMove(e);
        }, false);

        //鼠标抬起
        banner.addEventListener('touchend', (e) => {
            this.touchEnd(e);
            // banner.removeEventListener('touchmove', this.touchStart);
            // banner.removeEventListener('touchstart', this.touchStart)
        }, false);
    }


    /**
     * 按下
     * @param {*} e 
     */
    touchStart(e) {
        this.startX = e.targetTouches[0].clientX;
        this.startY = e.targetTouches[0].clientY;
        this.disY = this.startY - this.y;
        this.disX = this.startX - this.x
    }

    /**
     * 移动
     * @param {*} e 
     */
    touchMove(e) {
        this.x = e.targetTouches[0].clientX - this.disX;
        // console.log('移动中鼠标的x',e.targetTouches[0].clientX);
        // console.log('移动中距离', this.disX);
        // this.$ul.style.transition='all 0.5s ease';
        this.ulTranslateXNoAnim();
    }

    /**
     * 抬起
     * @param {*} e 
     */
    touchEnd(e) {
        this.index = Math.round(-this.x / this.lOffsetWidth);
        this.x = -this.index * this.lOffsetWidth;
        this.ulTranslateXAnim();
        this.match();
    }

    match() {
        if (this.index <= 0) {
            this.x = -this.lOffsetWidth * (this.ulLength - 1);
            this.index = this.ulLength - 1;
            this.ulTranslateXNoAnim();
        } else if (this.index >= this.ulLength - 1) {
            this.x = 0;
            this.index = 0;
            this.ulTranslateXNoAnim();
        }

    }


    createDom() {
        let ul = document.createElement('ul');
        let len = this.imgs.length;
        for (let i = 0; i < len; i++) {
            let li = document.createElement('li');
            let img = document.createElement('img');
            img.src = this.imgs[i];
            li.appendChild(img);
            ul.appendChild(li);
        }
        ul.appendChild(ul.children[0].cloneNode(true));
        ul.insertBefore(ul.children[ul.children.length - 2].cloneNode(true), ul.children[0]);
        this.$banner.appendChild(ul);
        return ul;
    }

}