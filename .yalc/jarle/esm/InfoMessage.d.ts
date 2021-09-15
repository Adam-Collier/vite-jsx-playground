import React from 'react';
export default function InfoMessage({ srOnly, ...props }: React.HTMLProps<HTMLDivElement> & {
    srOnly?: boolean;
}): JSX.Element;
