import React, {
	FC,
	PropsWithChildren,
	ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';
// components
import Icon, { IconType } from '../Icon';
// types
import { ButtonDropdownProps, ButtonVariant } from './types';
// utils
import { useClickOutside } from '../../utils/useClickOutside';

interface ButtonProps
	extends PropsWithChildren,
		React.BaseHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	as?: 'button' | 'link' | 'dropdown';
	type?: 'button' | 'submit' | 'reset';
	radius?: 'xs' | 'sm' | 'md' | 'lg';
	className?: string;
	error?: boolean;
	icon?: IconType;
	disabled?: boolean;
	linkProps?: LinkProps;
	selectedOptionsLength?: number;
	renderDropdown?: (props: ButtonDropdownProps) => ReactNode;
}

const variants = {
	primary: {
		default: 'bg-primary-500 text-white',
		hover: 'hover:bg-primary-700',
		active: 'active:outline-4 active:outline-primary-100',
		disabled: 'disabled:bg-primary-200',
	},
	secondary: {
		default: 'bg-white text-gray-600',
		hover: 'hover:bg-gray-50 hover:text-gray-800',
		active: 'active:outline-4 active:outline-gray-100 active:bg-white',
		disabled: 'disabled:text-gray-300 disabled:border-gray-200',
	},
	'link-primary': {
		default: 'text-primary',
		hover: 'hover:text-primary-700',
		active: 'active:text-primary-900',
		disabled: 'disabled:text-gray-300',
	},
	'link-grey': {
		default: 'text-gray-600',
		hover: 'hover:text-gray-700',
		active: 'active:text-gray-900',
		disabled: 'disabled:text-gray-300',
	},
	'tertiary-grey': {
		default: 'text-gray-600',
		hover: 'hover:text-gray-700 hover:bg-gray-100',
		active: 'active:outline-4 active:outline-gray-50',
		disabled: 'disabled:text-gray-300',
	},
};

const errorVairants = {
	primary: {
		default: 'text-white bg-red',
		hover: 'hover:bg-red-700',
		active: 'active:outline-4 active:outline-red-100',
		disabled: 'disabled:bg-red-200',
	},
	secondary: {
		default: 'text-red-700 border-red-300',
		hover: 'hover:bg-red-50 hover:text-red-900',
		active: 'active:outline-4 active:outline-red-100 active:bg-white',
		disabled: 'disabled:text-red-300 disabled:border-red-200',
	},
	'link-primary': {
		default: 'text-red-700',
		hover: 'hover:text-red-900',
		active: 'active:text-red-900',
		disabled: 'disabled:text-red-300',
	},
	'link-grey': {
		default: 'text-red-700',
		hover: 'hover:text-red-900',
		active: 'active:text-red-900',
		disabled: 'disabled:text-red-300',
	},
	'tertiary-grey': {
		default: 'text-red-700',
		hover: 'hover:text-red-900 hover:bg-red-100',
		active: 'active:outline-4 active:outline-red-50',
		disabled: 'disabled:text-red-300',
	},
};

const sizes = {
	xs: 'h-6 px-2 text-[10px] gap-1.5',
	sm: 'h-8 px-3 text-[12px] gap-2',
	md: 'h-10 px-4 text-[14px] gap-2.5',
	lg: 'h-12 px-6 text-[16px] gap-3.5',
};

const iconSizes = {
	xs: 'w-2.5 h-2.5',
	sm: 'w-3 h-3',
	md: 'w-4 h-4',
	lg: 'w-5 h-5',
};

const dropdownButtonStyles = {
	default:
		'h-full w-10 absolute top-0 bottom-0 right-0 flex justify-center items-center cursor-pointer',
	disabled: '',
	variants,
	errorVairants,
	open: 'mb-2 mr-2 rotate-180',
	close: 'mt-2 ml-2',
	theme: {
		primary: {
			default: 'border-l border-l-white',
			hover: '',
			active: '',
			disabled: 'pointer-events-none bg-primary-200',
		},
		secondary: {
			default: 'border-l-0',
			hover: '',
			active: '',
			disabled: 'pointer-events-none text-gray-300 border-gray-200',
		},
		'link-primary': {
			default: '',
			hover: '',
			active: '',
			disabled: 'pointer-events-none text-gray-300',
		},
		'link-grey': {
			default: '',
			hover: '',
			active: '',
			disabled: 'pointer-events-none text-gray-300',
		},
		'tertiary-grey': {
			default: '',
			hover: '',
			active: 'border-l border-l-white',
			disabled: 'pointer-events-none text-gray-300',
		},
	},
};

const dropdownStyles = {
	default:
		'z-[1000] absolute mt-1 px-6 py-7 rounded-2xl shadow-lg bg-white left-80',
};

const Button: FC<ButtonProps> = (props) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const {
		className,
		linkProps = { to: '' },
		variant = 'primary',
		as = 'button',
		type = 'button',
		size = 'md',
		error,
		children,
		icon,
		radius,
		renderDropdown,
		selectedOptionsLength,
		...rest
	} = props;

	const buttonRadius = radius || (size === 'lg' ? 'md' : size);

	const dropDownClasses =
		(renderDropdown && dropdownOpen) ||
		(selectedOptionsLength && selectedOptionsLength > 0)
			? Object.values(variants[variant])
			: Object.values(variants['secondary']); /** variant */

	const classes = clsx(
		'w-fit flex items-center justify-center whitespace-nowrap font-medium outline outline-transparent transition-all duration-200 disabled:pointer-events-none' /** general */,
		renderDropdown ? dropDownClasses : Object.values(variants[variant]),
		sizes[size] /** size */,
		error && Object.values(errorVairants[variant]) /** error */,
		`rounded-${buttonRadius}`,
		className
	);

	const handleDropdownClose = useCallback(() => setDropdownOpen(false), []);

	const handleDropdownTrigger = useCallback(() => {
		if (rest.disabled) return;
		setDropdownOpen(!dropdownOpen);
	}, [dropdownOpen, rest.disabled]);

	useClickOutside(dropdownRef, handleDropdownClose, !dropdownOpen);

	const content = (
		<>
			{icon && <Icon icon={icon} className={clsx(iconSizes[size])} />}
			{children}
		</>
	);

	if (as === 'link') {
		return (
			<Link {...(linkProps || {})} className={classes}>
				{content}
			</Link>
		);
	}

	if (as === 'dropdown') {
		return (
			<div className='w-fit'>
				<div className='flex relative pr-10'>
					<button
						className={clsx(classes, 'rounded-r-none', 'active:outline-0')}
						{...rest}
						type={type}
					>
						{content}
					</button>
					<div
						className={clsx(
							dropdownButtonStyles.default /** general */,
							rest.disabled &&
								dropdownButtonStyles.theme[variant].disabled /** disabled */,
							dropdownButtonStyles.theme[variant].default /** own variant */,
							dropdownOpen ||
								(selectedOptionsLength && selectedOptionsLength > 0)
								? Object.values(dropdownButtonStyles.variants[variant])
								: dropdownButtonStyles.variants[
										'secondary'
								  ] /** inherited variant */,
							error &&
								Object.values(
									dropdownButtonStyles.errorVairants[variant]
								) /** error */,
							dropdownOpen &&
								dropdownButtonStyles.variants[variant].hover.replaceAll(
									'hover:',
									''
								) /** inherited hover on open state */,
							dropdownOpen &&
								dropdownButtonStyles.theme[variant]
									.active /** own variant on open state */,
							buttonRadius === 'xs' ? `rounded-r` : `rounded-r-${buttonRadius}`
						)}
					>
						<Icon
							onClick={handleDropdownTrigger}
							icon='arrow'
							className={clsx(
								dropdownOpen
									? dropdownButtonStyles.open
									: dropdownButtonStyles.close
							)}
						/>
					</div>
				</div>
				{dropdownOpen && (
					<div ref={dropdownRef}>
						{renderDropdown?.({
							className: dropdownStyles.default,
							onClose: handleDropdownClose,
						})}
					</div>
				)}
			</div>
		);
	}

	return (
		<button className={classes} {...rest} type={type}>
			{content}
		</button>
	);
};

export default React.memo(Button);
