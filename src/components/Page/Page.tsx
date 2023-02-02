// modules
import { PropsWithChildren, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// utils
import { ROUTES_ARR } from '../../router';
import { Text } from '../Text';
interface Page extends PropsWithChildren {
	withLayout?: boolean;
	withTitle?: boolean;
	title?: string;
	subtitle?: string;
}

const Page: React.FC<Page> = (props) => {
	const { withTitle, title, children, subtitle } = props;
	const location = useLocation();
	const computedTitle =
		ROUTES_ARR.find(({ path }) => location.pathname === path)?.title || null;
	const hasTitle = Boolean(title || (withTitle && computedTitle));

	const tabTitle = useMemo(() => {
		if (title || computedTitle) return `${title || computedTitle} | Compiify`;
		return 'Compiify';
	}, [title, computedTitle]);

	return (
		<div>
			<Helmet>
				<title>{tabTitle}</title>
			</Helmet>
			{hasTitle && (
				<div className='flex items-center'>
					<Text as='h1' className='font-bold text-gray-900'>
						{title || computedTitle}
					</Text>
					<Text
						as='span'
						size={24}
						className='pl-4 text-gray-400 mt-1 font-normal'
					>
						{subtitle}
					</Text>
				</div>
			)}
			{children}
		</div>
	);
};

Page.defaultProps = {
	withLayout: true,
};

export default Page;
