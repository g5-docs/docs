import { defineConfig } from 'vitepress';
import deepmerge from 'deepmerge';
import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';

let mergeConfig = {
    head: []
};

const links = [];

if (process.env.NODE_ENV === 'production') {
    mergeConfig.head = [
        [
            'script',
            { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-XG10TC9M9Y' }
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-XG10TC9M9Y');"
        ]
    ]
} else {
    mergeConfig = {
        markdown: {
            lineNumbers: true,
        },
    }
}

export default defineConfig(deepmerge(mergeConfig, {
    lang: 'ko_KR',
    titleTemplate: ':title - 그누보드5 가이드',
    description: '사용자가 직접 만드는 그누보드 안내서 ',
    base: '/docs/',
    lastUpdated: true,
    themeConfig: {
        siteTitle: 'GNUBOARD 5',
        outline: [2, 4],
        sidebar: {
            '/gnuboard/': [
                {
                    text: '시작하기',
                    items: [
                        { text: '설치', link: '/gnuboard/install' },
                        { text: '초기 설정', link: '/gnuboard/config' },
                        { text: '테마 & 스킨', link: '/gnuboard/theme_skin' },
                        { text: '회원' },
                        { text: '포인트' },
                        { text: '짧은 주소' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                    ]
                },
                {
                    text: '환경 설정',
                    collapsible: true,
                    // collapsed: true,
                    items: [
                        { text: '기본 환경' },
                        { text: '관리 권한' },
                        { text: '테마' },
                        { text: '메뉴' },
                        { text: '메일 테스트' },
                        { text: '팝업 레이어 관리' },
                    ]
                },
                {
                    text: '회원',
                    collapsible: true,
                    // collapsed: true,
                    items: [
                        { text: '회원 관리' },
                        { text: '회원메일발송' },
                        { text: '접속자 집계' },
                        { text: '접속자 검색' },
                        { text: '접속자 로그 삭제' },
                        { text: '포인트 관리' },
                        { text: '투표 관리' },
                    ]
                },
                {
                    text: '게시판',
                    collapsible: true,
                    // collapsed: true,
                    items: [
                        { text: '게시판 관리' },
                        { text: '게시판 그룹' },
                        { text: '인기검색어관리' },
                        { text: '인기검색어순위' },
                        { text: '1:1문의설정' },
                        { text: '내용관리' },
                        { text: 'FAQ 관리' },
                        { text: '글, 댓글 현황' },
                    ]
                },
                {
                    text: '운영 & 관리',
                    collapsible: true,
                    // collapsed: true,
                    items: [
                        { text: 'phpinfo()' },
                        { text: '(통합1)세션파일 일괄삭제' },
                        { text: '(통합1)캐시파일 일괄삭제' },
                        { text: '(통합1)캡챠파일 일괄삭제' },
                        { text: '(통합1)썸네일파일 일괄삭제' },
                        { text: '(통합1)Browscap 업데이트' },
                        { text: '(통합1)접속로그 변환' },
                        { text: '(통합2)DB 업그레이드' },
                        { text: '(통합2)업데이트' },
                    ]
                },
            ],
            '/youngcart': [
                {
                    text: '쇼핑몰 관리',
                    items: [
                        { text: '쇼핑몰현황' },
                        { text: '쇼핑몰설정' },
                        { text: '주문내역' },
                        { text: '개인결제관리' },
                        { text: '분류관리' },
                        { text: '상품관리' },
                        { text: '상품문의' },
                        { text: '사용후기' },
                        { text: '상품재고관리' },
                        { text: '상품유형관리' },
                        { text: '상품옵션재고관리' },
                        { text: '쿠폰관리' },
                        { text: '쿠폰존관리' },
                        { text: '추가배송비관리' },
                        { text: '미완료주문' },
                    ]
                },
                {
                    text: '쇼핑몰현황/기타',
                    items: [
                        { text: '매출현황' },
                        { text: '상품판매순위' },
                        { text: '주문내역출력' },
                        { text: '재입고SMS알림' },
                        { text: '이벤트관리' },
                        { text: '이벤트일괄처리' },
                        { text: '배너관리' },
                        { text: '보관함현황' },
                        { text: '가격비교사이트' },
                    ],
                }
            ],
            '/make/': [
                {
                    text: '테마 만들기',
                    items: [
                        { text: '테마의 기본 구조', link: '/make/theme' },
                        { text: '레이아웃' },
                    ],
                },
                {
                    text: '스킨 만들기',
                    collapsible: true,
                    // collapsed: true,
                    items: [
                        { text: 'board' },
                        { text: 'connect' },
                        { text: 'content' },
                        { text: 'faq' },
                        { text: 'latest' },
                        { text: 'member' },
                        { text: 'new' },
                        { text: 'outlogin' },
                        { text: 'poll' },
                        { text: 'popular' },
                        { text: 'qa' },
                        { text: 'search' },
                        { text: 'shop' },
                        { text: 'social' },
                        { text: 'visit' },
                    ],
                },
                {
                    text: '플러그인 만들기',
                    items: [
                        { text: '플러그인', link: '/developers/make_plugin' },
                    ],
                },
            ],
            '/developers/': [
                {
                    text: '일반',
                    items: [
                        { text: '라이프 사이클', link: '/developers/lifecycle' },
                        { text: '설정', link: '/developers/config' },
                        { text: 'Database', link: '/developers/database' },
                        { text: '경로 및 URL Rewrite', link: '/developers/path_and_url' },
                        { text: '쿠키 및 세션', link: '/developers/cookie_and_session' },
                        { text: 'JS & CSS', link: '/developers/assets' },
                        { text: '캐시', link: '/developers/cache' },
                        { text: '디버깅', link: '/developers/debug' },
                        { text: '테스트', link: '/developers/test' },
                        { text: '헬퍼', link: '/developers/helpers' },
                    ]
                },
                {
                    text: '보안',
                    items: [
                        { text: '오염된 글로벌 변수', link: '/developers/polluted_variables' },
                        { text: 'SQL Injection', link: '/developers/sql_injection' },
                        { text: '토큰 및 암호화', link: '/developers/token_and_hash' },
                    ]
                },
                {
                    text: '확장하기',
                    items: [
                        { text: '플러그인', link: '/developers/make_plugin' },
                        { text: 'Hook', link: '/developers/hook' },
                        { text: '테마', link: '/make/theme' },
                        { text: '스킨', link: '/make/skin' },
                    ]
                },
                {
                    text: '헬퍼',
                    items: [
                        { text: '문자열' },
                        { text: '경로 및 URL' },
                        { text: '쿠기 및 세션' },
                        { text: '데이터' },
                        { text: '토큰 및 암호화' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                        { text: '' },
                    ]
                },
            ]
        },
        nav: [
            { text: '그누보드', link: '/gnuboard/index' },
            { text: '영카트', link: '/youngcart/index' },
            {
                text: '만들기',
                items: [
                    { text: '테마', link: '/make/theme' },
                    { text: '스킨', link: '/make/skin' },
                    { text: '개발자 가이드', link: '/developers/index' },
                ]
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/g5-docs/docs' },
        ],
        editLink: {
            pattern: 'https://github.com/g5-docs/docs/edit/main/docs/:path',
            text: '이 페이지 수정하기'
        },
        docFooter: {
            prev: '이전',
            next: '다음'
        },
        footer: {
            message: '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="크리에이티브 커먼즈 라이선스" style="display: inline-block;border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />이 저작물은 <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.'
        },
    },
    transformHtml: (_, id, { pageData }) => {
        if (!/[\\/]404\.html$/.test(id))
            links.push({
                // you might need to change this if not using clean urls mode
                url: pageData.relativePath.replace(/((^|\/))?\.md$/, '$2'),
                lastmod: pageData.lastUpdated
            })
    },
    buildEnd: async ({ outDir }) => {
        const sitemap = new SitemapStream({
            hostname: 'https://g5-docs.github.io/docs/'
        })
        const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
        sitemap.pipe(writeStream)
        links.forEach((link) => sitemap.write(link))
        sitemap.end()
        await new Promise((r) => writeStream.on('finish', r))
    }
}));