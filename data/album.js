/**
 * Album content — edit this file to add chapters, photos, and captions.
 * Photo paths are relative to the site root (e.g. photos/your-photo.jpg).
 * Leave src empty or omit it to show an elegant placeholder frame.
 */
window.ALBUM_DATA = {
  meta: {
    titleZh: "写给秋然",
    titleEn: "For Claire",
    subtitleZh: "四百多天",
    subtitleEn: "Four Hundred Days",
    fromZh: "孙郁桐",
    fromEn: "Jeffrey",
    toZh: "陈秋然",
    toEn: "Claire",
    occasionZh: "写给秋然 · 九月二十二日",
    occasionEn: "For Claire · September 22",
    basePath: "",
    since: "2025-07-30",
    avatarHim: window.ALBUM_EMBEDS[0],
    avatarHer: window.ALBUM_EMBEDS[1],
    dedicationZh:
      "秋然，生日快乐。从南开附属小学的同窗，到隔海相望的四百多个日子——距离很远，心意很近。愿这份小小的册子，替我陪你过这一天。",
    dedicationEn:
      "Claire, happy birthday. From classmates at Nankai University Affiliated Primary School to more than four hundred days across the sea — the miles are long, the heart is near. May this little album keep you company today.",
  },

  cover: {
    dateLineZh: "自二零二五年七月三十日起",
    dateLineEn: "Since July 30, 2025",
    hintZh: "轻触翻开",
    hintEn: "Tap to open",
  },

  story: {
    titleZh: "我们的故事",
    titleEn: "Our Story",
    paragraphs: [
      {
        zh: "我们曾是南开大学附属小学的同窗。那时的校园还很小，世界却好像很大。后来你在南开读本科，我去了北京读中学，又来到香港大学——地图上的线条越来越长，心里的那条却一直还在。",
        en: "We were classmates at Nankai University Affiliated Primary School. The campus felt small then; the world, somehow, already vast. Later you stayed at Nankai for university while I studied in Beijing through middle and high school, and then came to the University of Hong Kong — the lines on the map grew longer, but the one between us never faded.",
      },
      {
        zh: "高考结束后的六月，我们见了一面。那时还没有开始正式的恋爱，可缘分已经悄悄落笔。二零二五年七月三十日，是我的生日，也是我们故事正式起笔的日子。四百多个日夜，有告别，有重逢，有隔着屏幕的晚安，也有终于见面时轻声的「你好」。",
        en: "In June after the Gaokao, we met. We were not dating yet, but fate had already begun to write. July 30, 2025 — my birthday — was also the day our story truly began. Across more than four hundred days and nights: goodbyes and reunions, goodnights through a screen, and the soft “hello” when we finally meet again.",
      },
      {
        zh: "港大与南开，香港与天津。长途并不轻松，可温柔可以很具体——一张照片、一句留言、一本小小的纪念册。你总是那样可爱、文雅、踏实、善良、温柔。这一页页，都是想对你说的话。",
        en: "HKU and Nankai. Hong Kong and Tianjin. Distance is never easy, yet tenderness can be very concrete — a photo, a message, a keepsake album. You are cute, elegant, steady, kind, and gentle. Each of these pages is something I wanted to say to you.",
      },
      {
        zh: "秋然，九月二十二日，生日快乐。愿你被好好珍惜，也被好好看见。",
        en: "Claire — September 22 — happy birthday. May you be cherished, and truly seen.",
      },
    ],
  },

  ui: {
    langToggleZh: "中文",
    langToggleEn: "EN",
    coverLabelZh: "封面",
    coverLabelEn: "Cover",
    storyLabelZh: "我们的故事",
    storyLabelEn: "Our Story",
    albumLabelZh: "相册",
    albumLabelEn: "Album",
    prevZh: "上一页",
    prevEn: "Previous",
    nextZh: "下一页",
    nextEn: "Next",
    closeZh: "关闭",
    closeEn: "Close",
    placeholderZh: "照片将放在这里",
    placeholderEn: "A photo will live here",
    pageOfZh: "第 {current} 页 · 共 {total} 页",
    pageOfEn: "Page {current} of {total}",
    swipeHintZh: "左右滑动翻页",
    swipeHintEn: "Swipe to turn pages",
  },

  chapters: [
    {
      id: "beginnings",
      titleZh: "缘起",
      titleEn: "Beginnings",
      introZh: "还没说出口的时候，故事已经开始了。",
      introEn: "Before we named it, the story had already begun.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[41],
              captionZh: "一起主持",
              captionEn: "Hosting together",
              noteZh: "小时候就站在同一台——话筒很小，胆子很大。可爱捏。",
              noteEn: "Same stage, tiny mics, big courage. So cute.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[2],
              captionZh: "高考后的六月",
              captionEn: "June, after the Gaokao",
              noteZh: "那时还没有开始谈恋爱，可缘分已经轻轻落在桌上。",
              noteEn: "We were not dating yet — but fate had already taken its seat at the table.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[3],
              captionZh: "第一天 · 七月三十日",
              captionEn: "Day one · July 30",
              noteZh: "用 DaysMatter 记下的开始——从此，日子有了名字。",
              noteEn: "Marked in DaysMatter — from this day on, time had a name.",
            },
          ],
        },
      ],
    },
    {
      id: "claire",
      titleZh: "秋然",
      titleEn: "Claire",
      introZh: "可爱，文雅，踏实，善良，温柔——都是你。",
      introEn: "Cute, elegant, steady, kind, and gentle — all of you.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[4],
              captionZh: "你眼里的光",
              captionEn: "The light in your eyes",
              noteZh: "可爱得像一整个夏天，又认真得像在画画的自己。",
              noteEn: "As lovely as a whole summer — and as earnest as an artist at her canvas.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[5],
              captionZh: "温柔的样子",
              captionEn: "Your gentle way",
              noteZh: "文雅、踏实、善良、温柔——我想把这些词，都轻轻写在你旁边。",
              noteEn: "Elegant, steady, kind, gentle — words I want to write softly beside you.",
            },
          ],
        },
      ],
    },
    {
      id: "anime",
      titleZh: "画里",
      titleEn: "In the Frame",
      introZh: "喜欢的动漫里，也像我们。",
      introEn: "In a favorite anime — something like us.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[6],
              captionZh: "风与光",
              captionEn: "Wind and light",
              noteZh: "侧脸迎着光，像把心事说给远方。",
              noteEn: "A profile to the light — a quiet word to the distance.",
            },
            {
              src: window.ALBUM_EMBEDS[7],
              captionZh: "花与晴空",
              captionEn: "Flowers and sky",
              noteZh: "你在画里，我也在。",
              noteEn: "You in the frame — and I am there too.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[8],
              captionZh: "微信头像 · 他",
              captionEn: "WeChat · him",
              noteZh: "隔着屏幕，也对视。",
              noteEn: "Even through a screen — we meet eyes.",
            },
            {
              src: window.ALBUM_EMBEDS[9],
              captionZh: "微信头像 · 她",
              captionEn: "WeChat · her",
              noteZh: "一对头像，两颗安静的心。",
              noteEn: "A matching pair — two quiet hearts.",
            },
          ],
        },
      ],
    },
    {
      id: "first-date",
      titleZh: "初约",
      titleEn: "First Date",
      introZh: "二零二五年八月四日 · 798，再到国贸。",
      introEn: "August 4, 2025 · 798, then Guomao.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[10],
              captionZh: "798 的风",
              captionEn: "Wind through 798",
              noteZh: "你走在前面，夏天跟在后面。",
              noteEn: "You walked ahead; summer followed.",
            },
            {
              src: window.ALBUM_EMBEDS[11],
              captionZh: "墙上的梦",
              captionEn: "A mural, a dream",
              noteZh: "颜色很吵，心跳却很安静。",
              noteEn: "The colors were loud; our hearts were quiet.",
            }
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[12],
              captionZh: "一条小路",
              captionEn: "A long path",
              noteZh: "树影很长，像还没说完的话。",
              noteEn: "Long shadows — like words we had not finished.",
            },
            {
              src: window.ALBUM_EMBEDS[13],
              captionZh: "瞄准的时候",
              captionEn: "When you aimed",
              noteZh: "箭在弦上，我却先被你击中。",
              noteEn: "The arrow waited — I was already hit.",
            }
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[14],
              captionZh: "十指相扣",
              captionEn: "Hands held",
              noteZh: "桌上有一封未拆的温柔。",
              noteEn: "On the table, a tenderness still sealed.",
            },
            {
              src: window.ALBUM_EMBEDS[15],
              captionZh: "去国贸的路上",
              captionEn: "Toward Guomao",
              noteZh: "车厢很挤，世界却只剩我们。",
              noteEn: "A crowded car — and a world of two.",
            }
          ],
        }
      ],
    },
    {
      id: "second-meet",
      titleZh: "再遇",
      titleEn: "Again",
      introZh: "二零二五年八月十六日 · 北京，玩得很开心。",
      introEn: "August 16, 2025 · Beijing — a happy day.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[16],
              captionZh: "轰趴馆",
              captionEn: "Party house",
              noteZh: "笑声很近，手也握得很紧。",
              noteEn: "Laughter close — and hands held tighter.",
            },
            {
              src: window.ALBUM_EMBEDS[17],
              captionZh: "保龄球",
              captionEn: "Bowling",
              noteZh: "球道很长，快乐却很短很亮。",
              noteEn: "A long lane — and a short, bright joy.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[18],
              captionZh: "靠着你",
              captionEn: "Leaning on you",
              noteZh: "她说只要抱抱，肚子就不疼了。",
              noteEn: "She said a hug was enough to ease the ache.",
            },
            {
              src: window.ALBUM_EMBEDS[19],
              captionZh: "十指相扣",
              captionEn: "Fingers laced",
              noteZh: "异地不能天天这样——所以这一刻，更想慢慢记。",
              noteEn: "Distance won’t let us live like this every day — so this moment, we keep.",
            },
          ],
        },
      ],
    },
    {
      id: "before-school",
      titleZh: "开学前",
      titleEn: "Before School",
      introZh: "二零二五年八月二十五日 · 家里，遛弯，环球影城。",
      introEn: "August 25, 2025 · Home, a walk, Universal Studios.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[20],
              captionZh: "望远",
              captionEn: "Looking far",
              noteZh: "树很绿，日子却快到尽头。",
              noteEn: "The trees were green — and the days were almost over.",
            },
            {
              src: window.ALBUM_EMBEDS[21],
              captionZh: "秋千",
              captionEn: "The swing",
              noteZh: "阳光把影子拉得很长，像不想说再见。",
              noteEn: "Sunlight stretched our shadows — as if goodbye could wait.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[22],
              captionZh: "在家里",
              captionEn: "At home",
              noteZh: "一起玩游戏的下午，柔软得像这只玩偶。",
              noteEn: "An afternoon of games — soft as this little plush.",
            },
            {
              src: window.ALBUM_EMBEDS[23],
              captionZh: "车上",
              captionEn: "In the car",
              noteZh: "看向窗外的你，城市慢慢后退。",
              noteEn: "You looked out the window — the city slipped away.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[24],
              captionZh: "环球影城",
              captionEn: "Universal Studios",
              noteZh: "玩得很开心，分开时还是会难过。",
              noteEn: "So happy there — and still sad to part.",
            },
            {
              src: window.ALBUM_EMBEDS[25],
              captionZh: "墙上的我们",
              captionEn: "Us on the wall",
              noteZh: "只有分别，才迎来下一次相遇。珍惜现在，别等失去才懂。",
              noteEn: "Only parting makes the next meeting possible. Cherish now — before loss teaches us how.",
            },
          ],
        },
      ],
    },
    {
      id: "new-term",
      titleZh: "开学",
      titleEn: "New Term",
      introZh: "九月初 · 秋然的大学生活开始了。",
      introEn: "Early September · Claire’s university life begins.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[26],
              captionZh: "新的开始",
              captionEn: "A new start",
              noteZh: "挑战来了，你还是那样乐观。",
              noteEn: "New challenges — and you still meet them brightly.",
            },
            {
              src: window.ALBUM_EMBEDS[27],
              captionZh: "食堂的一顿",
              captionEn: "A meal on campus",
              noteZh: "普通的一天，也很珍贵。",
              noteEn: "An ordinary day — still precious.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[28],
              captionZh: "南开大学幼儿园",
              captionEn: "Nankai University Kindergarten",
              noteZh: "我小时候走过的路。时光绕了一圈，又与你相遇。",
              noteEn: "Roads I walked as a child. Time circled back — and found you again.",
            },
          ],
        },
      ],
    },
    {
      id: "surprise",
      titleZh: "惊喜",
      titleEn: "A Surprise",
      introZh: "二零二五年九月十二日 · 偷偷回南开。",
      introEn: "September 12, 2025 · A quiet return to Nankai.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[31],
              captionZh: "夜色里的你",
              captionEn: "You in the night",
              noteZh: "刚开学，心里起伏——我想给你一个惊喜。",
              noteEn: "School had just begun, and your heart was unsteady — I wanted to surprise you.",
            },
            {
              src: window.ALBUM_EMBEDS[32],
              captionZh: "南开校园",
              captionEn: "On campus",
              noteZh: "自己悄悄回来，只为见你一面。",
              noteEn: "I came back quietly — just to see you.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[33],
              captionZh: "一起走",
              captionEn: "Walking together",
              noteZh: "只有一天多一点，却够开心很久。",
              noteEn: "Only a day and a little more — enough happiness for a long while.",
            },
            {
              src: window.ALBUM_EMBEDS[34],
              captionZh: "两个人的影子",
              captionEn: "Two shadows",
              noteZh: "路灯把我们拉得很长，像不想分开。",
              noteEn: "Streetlights stretched us long — as if we wouldn’t part.",
            },
          ],
        },
      ],
    },
    {
      id: "distance",
      titleZh: "隔海",
      titleEn: "Across the Sea",
      introZh: "港大与南开之间，有一条温柔的线。",
      introEn: "Between HKU and Nankai, a gentle line remains.",
      pages: [
        {
          photos: [
            {
              src: "",
              captionZh: "香港 · 港大",
              captionEn: "Hong Kong · HKU",
              noteZh: "这边的海风，那边的晚自习——我们用声音把距离缩短一点。",
              noteEn: "Sea wind here, evening study there — we shorten the miles with our voices.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[30],
              captionZh: "军训 · 视频",
              captionEn: "Military training · video call",
              noteZh: "屏幕小小的，想念却很大。",
              noteEn: "A small screen — and a large missing.",
            },
          ],
        },
      ],
    },

    {
      id: "birthday",
      titleZh: "九月二十二日",
      titleEn: "September 22",
      introZh: "写给你的生日，也写给我们的四百多天。",
      introEn: "A birthday for you — and for our four hundred days.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[29],
              captionZh: "去年的生日",
              captionEn: "Last year’s birthday",
              noteZh: "日历走到零——离我最爱的小朋友的生日，就是今天。",
              noteEn: "The calendar reaches zero — today is my favorite person’s birthday.",
            },
          ],
        },
        {
          photos: [
            {
              src: "",
              captionZh: "今年也是",
              captionEn: "This year too",
              noteZh: "愿你被温柔包围，也愿我们的故事，慢慢写下去。",
              noteEn: "May kindness find you — and may our story keep unfolding, page by page.",
            },
          ],
        },
      ],
    },

    {
      id: "national-day",
      titleZh: "十一",
      titleEn: "October Holiday",
      introZh: "深圳湾的海，COCO Park，还有港大。",
      introEn: "Shenzhen Bay, COCO Park, and HKU.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[35],
              captionZh: "好玩的你",
              captionEn: "Playful you",
              noteZh: "假期很短，笑却很多。",
              noteEn: "A short holiday — and many smiles.",
            },
            {
              src: window.ALBUM_EMBEDS[36],
              captionZh: "深圳湾",
              captionEn: "Shenzhen Bay",
              noteZh: "你张开双臂，像把一整片海抱进来。",
              noteEn: "Arms wide — as if to hold the whole sea.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[37],
              captionZh: "国旗与海风",
              captionEn: "Flags and sea wind",
              noteZh: "十一不放假，我也腾出几天，只为陪你。",
              noteEn: "No holiday for me — still I carved out days, just for you.",
            },
            {
              src: window.ALBUM_EMBEDS[38],
              captionZh: "公园里的光",
              captionEn: "Light in the park",
              noteZh: "晚风把影子拉长，快乐还停在路上。",
              noteEn: "Evening light stretched our shadows — joy stayed on the path.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[39],
              captionZh: "看海",
              captionEn: "Watching the sea",
              noteZh: "坐在石头上，把城市留在身后。",
              noteEn: "On the rocks — the city left behind.",
            },
            {
              src: window.ALBUM_EMBEDS[40],
              captionZh: "然后分开",
              captionEn: "Then we parted",
              noteZh: "我带你看了港大，再各自回去上课。短暂，却够想很久。",
              noteEn: "I showed you HKU — then back to class. Brief, and long to miss.",
            },
          ],
        },
      ],
    },

    {
      id: "reading-week",
      titleZh: "回南开",
      titleEn: "Back to Nankai",
      introZh: "二零二五年十月十二日前后 · Reading Week。",
      introEn: "Around October 12, 2025 · Reading Week.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[42],
              captionZh: "校园里",
              captionEn: "On campus",
              noteZh: "reading week 回来了，路还是熟悉的。",
              noteEn: "Reading week brought me back — the paths still familiar.",
            },
            {
              src: window.ALBUM_EMBEDS[44],
              captionZh: "一起遛弯",
              captionEn: "A walk together",
              noteZh: "不着急，慢慢走就很好。",
              noteEn: "No rush — walking slowly was enough.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[43],
              captionZh: "一起吃饭",
              captionEn: "A meal together",
              noteZh: "一碗热的，两个人的下午。",
              noteEn: "One warm bowl — an afternoon for two.",
            },
          ],
        },
      ],
    },

    {
      id: "hundred-days",
      titleZh: "一百天",
      titleEn: "One Hundred Days",
      introZh: "自二零二五年七月三十日起 · 第一百天。",
      introEn: "Since July 30, 2025 · day one hundred.",
      pages: [
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[45],
              captionZh: "第一百天",
              captionEn: "Day one hundred",
              noteZh: "一百个日子叠在一起——有分别，有重逢，有隔着屏幕的晚安，也有终于并肩的风。",
              noteEn: "A hundred days stacked together — partings, reunions, goodnights through a screen, and wind when we finally walk side by side.",
            },
          ],
        },
        {
          photos: [
            {
              src: window.ALBUM_EMBEDS[46],
              captionZh: "在一起的第一百天",
              captionEn: "Our hundredth day together",
              noteZh: "数字不大，心意很长。愿下一个一百天，也像这样慢慢走来。",
              noteEn: "The number is small; the heart is long. May the next hundred days arrive just as gently.",
            },
          ],
        },
      ],
    },

  ],
};
