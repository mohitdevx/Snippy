export const detectLanguage = (code) => {
    if (code.includes('javascript') || code.includes('const') || code.includes('function')) {
        return 'JavaScript';
    } else if (code.includes('python') || code.includes('def ') || code.includes('import')) {
        return 'Python';
    } else if (code.includes('java') && code.includes('class')) {
        return 'Java';
    } else if (code.includes('<?php')) {
        return 'PHP';
    } else if (code.includes('#include')) {
        return 'C++';
    }
    return 'Code';
};