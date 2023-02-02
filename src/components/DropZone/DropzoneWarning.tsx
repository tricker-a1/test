export type DropzoneWarningProps = {
	warningType: 'preloading' | 'overlapping';
};

const DropzoneWarning = ({ warningType }: DropzoneWarningProps) => {
	const message =
		warningType === 'preloading'
			? 'Please upload employee data first <br/> to continue uploading csv file for other sections'
			: 'Multiple csv file uploads are not allowed simultaneously <br /><span style="color: #ff9f00">Please wait until the previous file is uploaded</span>';

	return (
		<div className='container flex shadow-sm rounded-md mt-6 bg-white py-8 px-4 items-center min-h-40 justify-center'>
			<p
				className='text-warning-800 text-[14px] text-center font-normal'
				dangerouslySetInnerHTML={{ __html: message }}
			/>
		</div>
	);
};

export default DropzoneWarning;
