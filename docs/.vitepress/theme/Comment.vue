<template>
    <ClientOnly>
        <Giscus
            id="comments"
            repo="g5-docs/docs"
            repoId="R_kgDOIyk7gA"
            category="문서 댓글"
            categoryId="DIC_kwDOIyk7gM4CTpwI"
            mapping="pathname"
            term=""
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            :theme="theme"
            lang="ko"
            loading="lazy"
        />
    </ClientOnly>
</template>

<script setup>
import Giscus from '@giscus/vue';

defineProps({
    theme: String
})
</script>