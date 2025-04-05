import Link from 'next/link';
import cn from 'classnames';

interface Props {
	isSelected?: boolean;
	isMobile?: boolean;
	isBanner?: boolean;
	href?: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export default function NavLink({
	isSelected,
	isMobile,
	isBanner,
	href,
	children,
	className,
	onClick,
}: Props) {
	const classNamevar = cn(
		className,
		'text-white rounded-md px-3 py-2 font-medium',
		{
			'bg-gray-900': isSelected,
			'text-gray-300 hover:bg-gray-700 hover:text-white':
				!isSelected && !isBanner,
			'block text-base': isMobile,
			'text-sm': !isMobile,
			'text-gray-300': isBanner,
		}
	);
	/*si no tiene se combierte en un simple span*/
	if (!href) {
		return (
			<span className={classNamevar} role='button' onClick={onClick}>
				{children}
			</span>
		);
	}

	return (
		<Link className={classNamevar} href={href}>
			{children}
		</Link>
	);
}