/**
 * The component that renders the user's code.
 */
declare const Preview: ({ className, holderTheme, ...props }: {
    className?: string | undefined;
    /** An optional holder.js theme */
    holderTheme?: any;
}) => JSX.Element | null;
export default Preview;
