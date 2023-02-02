export type AvatarProps = {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	url?: string;
};

const Avatar = ({ size = 'md', url = '/avatar/avatar1.png' }: AvatarProps) => {
	const imageSizes = {
		xs: { width: '24px', height: '24px' },
		sm: { width: '32px', height: '32px' },
		md: { width: '40px', height: '40px' },
		lg: { width: '48px', height: '48px' },
		xl: { width: '56px', height: '56px' },
	};

	return (
		<div
			className='flex justify-center items-center'
			style={{
				width: imageSizes[size].width,
				height: imageSizes[size].height,
			}}
		>
			<img src={url} className='rounded-full' />
		</div>
	);
};

export default Avatar;
