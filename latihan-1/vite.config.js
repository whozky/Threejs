import glsl from 'vite-plugin-glsl';

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    plugins:
    [
        glsl()
    ]
};