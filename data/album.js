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
    // Prefer js/config.js for deploy base path. Kept here for reference only.
    basePath: "",
    since: "2025-07-30",
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
        zh: "二零二五年七月三十日，是我的生日，也是我们故事正式起笔的日子。四百多个日夜，有告别，有重逢，有隔着屏幕的晚安，也有终于见面时轻声的「你好」。",
        en: "July 30, 2025 — my birthday — was also the day our story truly began. Across more than four hundred days and nights: goodbyes and reunions, goodnights through a screen, and the soft “hello” when we finally meet again.",
      },
      {
        zh: "港大与南开，香港与天津。长途并不轻松，可温柔可以很具体——一张照片、一句留言、一本小小的纪念册。这一页页，都是想对你说的话。",
        en: "HKU and Nankai. Hong Kong and Tianjin. Distance is never easy, yet tenderness can be very concrete — a photo, a message, a keepsake album. Each of these pages is something I wanted to say to you.",
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
      titleZh: "起点",
      titleEn: "Beginnings",
      introZh: "那些最初的光，温柔而安静。",
      introEn: "The first light — quiet, and gentle.",
      pages: [
        {
          photos: [
            {
              src: "",
              captionZh: "小学时光 · 南开大学附属小学",
              captionEn: "Elementary days · Nankai Affiliated Primary",
              noteZh: "同窗的日子，像一本尚未写完的练习簿。",
              noteEn: "Classmate days — like a workbook still being written.",
            },
          ],
        },
        {
          photos: [
            {
              src: "",
              captionZh: "各自长大的路",
              captionEn: "Growing on our own paths",
              noteZh: "北京的中学，南开的校园——我们在不同的城市里，慢慢变成现在的模样。",
              noteEn: "Beijing schools, Nankai’s campus — in different cities, we became who we are.",
            },
          ],
        },
      ],
    },
    {
      id: "together",
      titleZh: "在一起",
      titleEn: "Together",
      introZh: "从二零二五年七月三十日开始的故事。",
      introEn: "The story that began on July 30, 2025.",
      pages: [
        {
          photos: [
            {
              src: "",
              captionZh: "起笔的那天",
              captionEn: "The day it began",
              noteZh: "生日与告白叠在同一页——像把两份心意折进同一封信。",
              noteEn: "A birthday and a beginning on the same page — two hearts folded into one letter.",
            },
          ],
        },
        {
          photos: [
            {
              src: "",
              captionZh: "四百多个日子",
              captionEn: "Four hundred days",
              noteZh: "不算太长，也不算短暂。刚好够我们学会想念。",
              noteEn: "Not too long, not too brief — just enough to learn how to miss someone well.",
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
              src: "",
              captionZh: "天津 · 南开",
              captionEn: "Tianjin · Nankai",
              noteZh: "你在的城市，总有我想象中的灯火。",
              noteEn: "In the city where you are, I picture the lights.",
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
              src: "",
              captionZh: "生日快乐，秋然",
              captionEn: "Happy birthday, Claire",
              noteZh: "愿你被温柔包围，也愿我们的故事，慢慢写下去。",
              noteEn: "May kindness find you — and may our story keep unfolding, page by page.",
            },
          ],
        },
        {
          photos: [
            {
              src: "",
              captionZh: "给你的一页空白",
              captionEn: "A blank page for you",
              noteZh: "留给以后的照片、以后的笑、以后的我们。",
              noteEn: "Saved for future photos, future laughter, and the us still to come.",
            },
          ],
        },
      ],
    },
  ],
};
