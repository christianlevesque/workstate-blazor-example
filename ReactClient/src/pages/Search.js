import {useEffect, useState} from "react";
import ArticleList from '@/components/articles/ArticleList';
import TextInput from "@/components/forms/TextInput"
import {search as searchFunc} from "@/services/wikipedia";

const minLength = 3;

export default function Search() {
	const [loading, setLoading] = useState(false);
	const [articles, setArticles] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {document.title = 'Search'}, []);

	useEffect(() => {
		const loadArticles = async () => {
			if (!search) {
				if (articles.length > 0) {
					setArticles([]);
				}
				return;
			}

			setLoading(true);
			const newArticles = await searchFunc(search);
			setArticles(newArticles);
			setLoading(false);
		}

		loadArticles();
	}, [search])

	return (
		<>
			<h1>Search Wikipedia</h1>

			<TextInput value={search}
			           setValue={setSearch}
			           minLength={minLength}
			           interval={300}>
				Search
			</TextInput>

			<ArticleList articles={articles}
			             isLoading={loading}/>
		</>
	);
}