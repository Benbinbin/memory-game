/*
 * 创建一个包含所有 16 张卡片的数组
 */
let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 shuffle 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数参考：http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// 在页面上初始化卡片元素

let setCards = function (cards) {
    shuffledCards = shuffle(cards);
    shuffledCards.forEach(function (card) {
        $('.deck').append('<li class="card"></li>')
        let signTemplate = '<i class="%data%"></i>';
        let sign = signTemplate.replace("%data%", card);
        $('.card:last').append(sign);
    })
}

setCards(cards);

/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号
 *  - 将卡片添加到状态为 open 的数组中
 *  - 如果数组中只有一张卡片， 仅增加移动计数器， 等待玩家点击第二种卡片
 *  - 如果数组中有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定（设置类属性 match）,并将卡片从 open 数组中移除（显示卡片）
 *    + 如果卡片不匹配，将卡片从 open 数组中的移除（隐藏卡片）
 *    + 增加移动计数器
 *  - 如果所有卡都匹配，则显示带有最终分数的消息
 */

let open = [];
let score = 0;
let match = 0;
let moves = 0;

let container = $(".container");

// 创建一个卡片类，添加相应的方法
class Card {
    constructor(target) {
        this.target = target;
    }

    open() {
        this.target.addClass("open animate__animated animate__flipInY");
        // add animation and when it end remove the class
        this.target.on('animationend', () => {
            this.target.removeClass('animate__animated animate__flipInY');
        });
    }

    addCard() {
        open.push(this.target.html());
    }

    match() {
        open = [];
        let matchElements = $(".open");
        matchElements.toggleClass("open match")
        matchElements.addClass("match animate__animated animate__bounceIn");
        matchElements.on('animationend', () => {
            matchElements.removeClass("open animate__animated animate__bounceIn");
        });
        ++score;
    }

    unMatch() {
        open = [];
        let openElements = $('.open');
        openElements.toggleClass("open unMatch")
        openElements.addClass("animate__animated animate__shakeX");
        openElements.on('animationend', () => {
            openElements.removeClass("unMatch animate__animated animate__shakeX");
        });
    }
}

let count = function () {
    ++moves;
    $(".moves").text(moves);
};

let win = function () {
    container.hide();
    $("body").append(`<div class="message"><h1>Congratulations! You Won!</h1><p>With ${moves} moves and 3 stars.</p><button class="start">Play Again</button></div>`)
};

$(".deck").on('click', 'li', function (event) {
    let target = $(event.currentTarget);
    if (!target.hasClass("open") && !target.hasClass("match")) {
        let card = new Card(target);
        card.open();
        count();
        card.addCard();
        if (open.length === 2) {
            if (open[0] === open[1]) {
                card.match();
                ++match;
                if (match === 8) {
                    win();
                }
            } else {
                card.unMatch();
            }
        }
    }

})

$(".restart").on("click", function () {
    $('.card').remove();
    setCards(cards);
    open = [];
    score = 0;
    match = 0;
    moves = 0;
    $(".moves").text(moves);
})

$("body").on("click", ".start", function () {
    console.log("start")
    $('.message').remove();
    container.show();
    $('.card').remove();
    setCards(cards);
    open = [];
    score = 0;
    match = 0;
    moves = 0;
    $(".moves").text(moves);
})

