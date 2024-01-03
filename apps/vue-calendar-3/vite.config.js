import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

const commonConfig = {
  plugins: [vue()],
};

export default defineConfig(({ command, mode }) => {
  // dev config
  if (command === 'serve') {
    return {
      ...commonConfig,
      resolve: {
        alias: {
          vue: 'vue/dist/vue.cjs',
        },
      },
      server: {
        open: '/example/index.html',
      },
    };
  }

  // build config
  const shouldMinify = mode.includes('minify');
  const isESM = mode.includes('esm');
  const isIE11 = mode.includes('ie11');

  const filenameBase = `toastui-vue-3-calendar${isIE11 ? '.ie11' : ''}${
    shouldMinify ? '.min' : ''
  }`;

  const buildConfig = {
    ...commonConfig,
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/Calendar.js'),
        name: 'tui.VueCalendar',
        formats: isESM ? ['es'] : ['umd'],
        fileName: (format) => `${filenameBase}${format === 'es' ? '.m' : '.'}js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      minify: shouldMinify,
    },
  };

  if (isIE11) {
    Object.assign(buildConfig, {
      resolve: {
        alias: {
          '@toast-ui/calendar': '@toast-ui/calendar/ie11',
        },
      },
    });
    buildConfig.plugins.push(
      commonjs({
        transformMixedEsModules: true,
      })
    );
  }

  return buildConfig;
});
