# Design System - Typography

This document outlines the standardized typography system used across the portfolio.

## Typography Scale

All font sizes are defined as CSS variables in `app/globals.css` to ensure consistency across the entire application.

### Font Sizes

| Variable | Size | Pixels | Usage |
|----------|------|--------|-------|
| `--font-display` | 4.5rem | 72px | Hero titles on landing page |
| `--font-heading-xl` | 3.5rem | 56px | Main section titles (Experience, Tools of the Trade) |
| `--font-heading-l` | 2.8rem | 44.8px | Large headings, subsection titles |
| `--font-heading-m` | 2.2rem | 35.2px | Medium headings, job titles |
| `--font-heading-s` | 1.5rem | 24px | Small headings, block titles |
| `--font-body-l` | 1.3rem | 20.8px | Large body text, story cards |
| `--font-body-m` | 1rem | 16px | Standard body text, navigation |
| `--font-body-s` | 0.875rem | 14px | Small text, labels, meta information |

### Line Heights

| Variable | Value | Usage |
|----------|-------|-------|
| `--line-height-tight` | 1.1 | Headings, display text |
| `--line-height-normal` | 1.4 | Medium text, subtitles |
| `--line-height-relaxed` | 1.6 | Body text, paragraphs |

### Letter Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `--letter-spacing-tight` | -0.03em | Large display text |
| `--letter-spacing-normal` | -0.01em | Headings, standard text |
| `--letter-spacing-wide` | 0.15em | Uppercase labels, small text |

## Usage Examples

### In CSS

```css
.myTitle {
  font-size: var(--font-heading-xl);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-normal);
}

.myBodyText {
  font-size: var(--font-body-l);
  line-height: var(--line-height-relaxed);
}

.myLabel {
  font-size: var(--font-body-s);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}
```

### In React Components

```tsx
<ScrollRevealText
  text="My Section Title"
  fontSize="var(--font-heading-xl)"
    fontWeight={400}
  lineHeight={1.1}
  letterSpacing="var(--letter-spacing-normal)"
/>
```

### Inline Styles

```tsx
<p style={{
  fontSize: 'var(--font-body-l)',
  lineHeight: 'var(--line-height-relaxed)',
  color: '#ccc'
}}>
  Body text content
</p>
```

## Page-Specific Implementation

### Home Page (`app/page.tsx`)
- **Hero title**: `--font-display` ("Year 5 of UX")
- **Current role**: `--font-heading-m`
- **Availability badge**: `--font-heading-s`
- **Section labels**: `--font-body-s`

### About Page (`app/about/page.tsx`)
- **Section titles**: `--font-heading-xl` ("Experience", "Deep in my bag")
- **Story card titles**: `--font-body-l`
- **Story card body**: `--font-body-l`
- **Job titles**: `--font-heading-m`
- **Skills text**: `--font-heading-l`

### Case Study Pages (`app/projects/*/page.tsx`)
- **Hero title**: Responsive clamp (handled separately)
- **Meta labels**: `--font-body-s`
- **Meta values**: `--font-body-m`
- **Section titles**: Responsive clamp (handled separately)
- **Block titles**: `--font-heading-s`
- **Body text**: `--font-body-l`
- **CTA titles**: `--font-heading-l`

### Components
- **Header navigation**: `--font-body-m`
- **Footer links**: `--font-body-s`
- **Footer brand**: `--font-body-m`
- **Projects title**: `--font-body-s`

## Benefits

1. **Consistency**: All text sizes are standardized across the portfolio
2. **Maintainability**: Change sizes globally by updating CSS variables
3. **Readability**: Proper hierarchy and spacing for optimal reading experience
4. **Scalability**: Easy to add new font sizes or adjust existing ones
5. **Type Safety**: Clear naming convention makes it obvious which size to use

## Guidelines

1. **Always use CSS variables** instead of hardcoded rem/px values
2. **Match line-height to font size**: 
   - Tight for large headings
   - Relaxed for body text
3. **Match letter-spacing appropriately**:
   - Tight for large display text
   - Wide for small uppercase labels
4. **Don't create new font sizes** without updating this documentation
5. **Test responsive behavior** at different screen sizes

## Responsive Considerations

Some elements use responsive `clamp()` values for better mobile experience. These are typically:
- Hero titles that need to scale dramatically between mobile and desktop
- Section headings in constrained spaces

For most standard text, the CSS variables provide good defaults across all screen sizes.

