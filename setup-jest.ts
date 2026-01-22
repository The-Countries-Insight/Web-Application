import 'jest-preset-angular/setup-jest';

// Opcional: mocks que ayudan a Angular Material y al DOM
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', { value: '<!DOCTYPE html>' });

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
  }),
});

// Necesario para animaciones de Angular Material
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});
