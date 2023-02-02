import React, { PropsWithChildren } from 'react';

export enum TextAlign {
	'center',
	'left',
	'right',
}

interface TextProps extends PropsWithChildren {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	size?: number;
	className?: string;
	align?: 'right' | 'left' | 'center';
}

const Text: React.FC<TextProps> = ({
	as: Comp = 'p',
	children,
	size = 14,
	className = '',
	align = 'center',
}) => {
	let fontSize = size;

	switch (Comp) {
		case 'h1':
			fontSize = 36;
			break;
		case 'h2':
			fontSize = 32;
			break;
		case 'h3':
			fontSize = 24;
			break;
		case 'h4':
			fontSize = 18;
			break;
		case 'h5':
			fontSize = 16;
			break;
		case 'h6':
			fontSize = 14;
			break;
		default:
			fontSize = size;
			break;
	}

	return (
		<Comp
			className={`text-[${fontSize}px] ${className} leading-[120%]`}
			style={{
				fontSize: `${fontSize}px`,
				textAlign: align,
			}}
		>
			{children}
		</Comp>
	);
};

export default Text;
