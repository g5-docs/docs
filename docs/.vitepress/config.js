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
            '/users/': [
                {
                    text: '설치',
                    items: [
                        { text: '설치', link: '/install' },
                        { text: '테마 & 스킨' },
                        { text: '페이지 꾸미기' },
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
                        { text: 'Database' },
                        { text: 'Hook' },
                        { text: 'cache' },
                        { text: '경로 및 URL' },
                        { text: '문자열' },
                        { text: '쿠키 & 세션' },
                        { text: '토큰 및 암호화' },
                        { text: 'assets' },
                        { text: 'cache' },
                        { text: '디버깅' },
                        { text: '테마 만들기' },
                        { text: '스킨 만들기' },
                        { text: 'extend' },
                        { text: 'plugin' },
                        { text: '보안' },
                    ]
                }
            ]
        },
        nav: [
            { text: '그누보드', link: '/users/index' },
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
        }
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