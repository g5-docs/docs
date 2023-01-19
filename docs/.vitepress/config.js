export default {
    lang: 'ko_KR',
    titleTemplate: ':title - 그누보드5 가이드',
    base: '/docs/',
    lastUpdated: true,
    appearance: 'dark',
    themeConfig: {
        siteTitle: 'GNUBOARD 5',
        outline: [2, 3],
        sidebar: {
            '/gnuboard/': [
                {
                    text: '설치',
                    items: [
                        { text: '설치', link: '/gnuboard/install' },
                        { text: '테마 & 스킨', link: '/gnuboard/theme_skin' },
                    ]
                },
                {
                    text: '환경설정',
                    items: [
                        { text: '기본 환경' },
                        { text: '관리 권한' },
                        { text: '테마' },
                        { text: '메뉴' },
                        { text: '메일 테스트' },
                        { text: '팝업 레이어 관리' },
                        { text: '세션파일 일괄삭제' },
                        { text: '캐시파일 일괄삭제' },
                        { text: '캡챠파일 일괄삭제' },
                        { text: '썸네일파일 일괄삭제' },
                        { text: 'phpinfo()' },
                        { text: 'Browscap 업데이트' },
                        { text: '접속로그 변환' },
                        { text: '부가서비스' },
                    ]
                },
                {
                    text: '회원관리',
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
                    text: '게시판 관리',
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
            ],
            '/youngcart': [
                {
                    text: '영카트',
                    items: [
                    ]
                }
            ],
            '/developers/': [
                {
                    text: '개발자 가이드',
                    items: [
                        { text: 'Database', link: '/developers/database' },
                        { text: 'Hook', link: '/developers/hook' },
                        { text: '경로 및 URL', link: '/developers/path_and_url' },
                        { text: '문자열', link: '/developers/string' },
                        { text: '쿠키 및 세션', link: '/developers/cookie_and_session' },
                        { text: '토큰 및 암호화', link: '/developers/token_and_hash' },
                        { text: 'assets', link: '/developers/assets' },
                        { text: 'cache', link: '/developers/cache' },
                        { text: '디버깅', link: '/developers/debug' },
                        { text: '기능 확장하기', link: '/developers/extend' },
                        { text: '보안', link: '/developers/security' },
                    ]
                },
                {
                    text: '테마 & 스킨',
                    items: [
                        { text: '테마', link: '/developers/make_theme' },
                        { text: '스킨', link: '/developers/make_skin' },
                    ]
                },
                {
                    text: '플러그인',
                    items: [
                        { text: 'extend', link: '/developers/extend' },
                    ]
                }
            ]
        },
        nav: [
            { text: '그누보드', link: '/gnuboard/index' },
            { text: '영카트', link: '/youngcart/index' },
            { text: '개발자', link: '/developers/index' },
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
    head: [
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
}