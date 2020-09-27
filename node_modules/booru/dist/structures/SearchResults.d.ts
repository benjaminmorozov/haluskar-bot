import Booru from '../boorus/Booru';
import Post from '../structures/Post';
import SearchParameters from './SearchParameters';
export default class SearchResults extends Array<Post> {
    booru: Booru;
    page: number;
    private readonly tags;
    private readonly options;
    constructor(posts: Post[], tags: string[], options: SearchParameters, booru: Booru);
    readonly first: Post;
    readonly last: Post;
    nextPage(): Promise<SearchResults>;
    tagged(tags: string[] | string, { invert }?: {
        invert?: boolean | undefined;
    }): SearchResults;
    blacklist(tags: string[] | string): SearchResults;
}
