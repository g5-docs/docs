import { h, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue'

import { useData, useRoute, useRouter } from 'vitepress';


export default {
    ...DefaultTheme,
    Layout() {
        const { isDark } = useData();
        const route = useRoute();
        const router = useRouter();

        watch(route, (path) => {
            const el = document.querySelector('giscus-widget');
            if (el) {
                el.update();
            }

            if (window.gtag) {
                gtag('send', 'pageview', path);
            }
        }, { immediate: true });

        watch(isDark, (dark) => {
            const el = document.querySelector('giscus-widget');
            if (el) {
                el.theme = dark ? 'transparent_dark' : 'light';
            }
        });

        return h(DefaultTheme.Layout, null, {
            'doc-footer-before': () => h(Comment, { theme: isDark.value ? 'transparent_dark' : 'light' })
        })
    }
}