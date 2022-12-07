import ArticleSingle from '@/components/articles/ArticleSingle';
import Spinner from '@/components/Spinner';

export default function ArticleList({ articles, isLoading }) {
	return (
		<>
			<div className="py-3"></div>

			{isLoading && <Spinner/>}

			{!isLoading && articles.length === 0 && <p>There are no articles to display.</p>}

			<div>
				{articles.map(a => (
					<ArticleSingle data={a}
					               key={a.title}/>
				))}
			</div>
		</>
	)
}