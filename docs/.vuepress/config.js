module.exports = {
  base: '/', //部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/"，它的值应当总是以斜杠开始，并以斜杠结束。
  dest: './dist',
  // ga: 'UA-137822405-1',
  plugins: [
    // ['@vuepress/google-analytics', { ga: 'UA-137822405-1' }],
    // ['vuepress-plugin-minimal-analytics', { ga: 'UA-137822405-1' }],
    ['vuepress-plugin-feed', {
        // canonical_base: 'https://www.shawnxli.com',
        // posts_directories: ['posts'],
      }],
  ],
  title: 'Xiang Li',
  description: 'Serenity, Courage, Wisdom', //网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中,还显示在首页的文章列表上面
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ]
  ],
  theme: 'indigo-material',
  locales: {
    '/': {
      lang: 'en-US',
      title: "Xiang Li",
      description: 'Serenity, Courage, Wisdom'
    }
  },
  markdown: {
    lineNumbers: true //是否开启文章代码左边的行号显示
  },
  serviceWorker: true,
  themeConfig: {
    serviceWorker: {
      updatePopup: true,
    },
    placeholder: 'Search', //搜索框的默认文章
    searchReply: 'Please try other keywords',
    author: 'Xiang Li', //侧边栏的设置
    email: 'me@shawnxli.com',
    pagination: '5', //每一页显示的文章个数
    avatar: '/avatar.jpg', //头像地址
    brand: '/brand.jpg', //头像背景图片地址
    github: 'https://github.com/Maecenas', //点击github跳转的地址
    linkedin: 'https://www.linkedin.com/in/shawn-xiang-li/',
    vssue: {
      //评论的配置,
      need: false, //是否需要评论
      development: {
        //开发环境下的配置
        clientId: '',
        clientSecret: '',
        owner: '',
        repo: '',
        locale: 'en-US'
      },
      production: {
        //生产环境的配置
        clientId: '',
        clientSecret: '',
        owner: '',
        repo: '',
        locale: 'en-US'
      }
    },
    menus: {
      //侧边栏的文字
      tags: 'Tags',
      home: 'Home',
      all: 'Archives',
      github: 'Github',
      about: 'About'
    }
  },
};
