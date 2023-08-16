<template>
  <div class="page-wrap">
    <AzHeader class="fixed top-0 left-0 w-full border-b" />
    <main class="main flex w-screen min-h-screen pt-[4.5rem] bg-gray-50">
      <AzSidebar class="h-screen fixed bg-white border-r border-t" />
      <div class="doc-wrap w-full my-8 ml-72">
        <ContentDoc
          class="content prose md:max-w-3xl lg:max-w-4xl mx-auto p-3 md:py-10 md:px-12 bg-white ring-gray-900/5 shadow-slate-700/10 shadow-xl"
        >
          <template #not-found>
            <p class="text-2xl p-20 text-center">Document not found</p>
          </template>
        </ContentDoc>
      </div>
    </main>
  </div>
</template>
