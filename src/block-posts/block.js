/**
 * BLOCK: Dynamic Posts Grid
 *
 * Dynamic block that loads recent posts filtered by category. Includes multiple layout options.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import attributes from "./attributes";
import PostGridBlock from "./editor";
// import PostGridBlock from "./editor";
// import Inspector from "./inspector";

const { registerBlockType } = wp.blocks; 
const { withSelect } = wp.data;
const { BlockControls, BlockAlignmentToolbar } = wp.blockEditor || wp.editor;
const { Placeholder, Spinner, Toolbar, QueryControls } = wp.components;
const { decodeEntities } = wp.htmlEntities;
const { addQueryArgs } = wp.url;
const { apiFetch } = wp;

// Trim Excerpt handler
function trimExcerpt(str, no_words) {
	return str.split(" ").splice(0, no_words).join(" ");
}

const PostList = (props) => {
    const { attributes, setAttributes, className, posts } = props;
    const { 
        postLayout, 
        wrapAlignment, 
        categories,
        postTitleTag,
        checkPostExcerpt,
        checkPostLink,
        excerptLength,
        readMoreText
    } = attributes;

    const emptyPosts = Array.isArray(posts) && posts.length;
    const PostHeadingTag = postTitleTag;

    // if (categories !== "") {
    //     apiFetch({
    //         path: addQueryArgs("/wp/v2/categories", {
    //             per_page: -1,
    //         }),
    //     })
    //     .then((categoriesList) => {
    //         setAttributes({
    //             categories: "",
    //         });
    //     })
    //     .catch(() => {
    //         setAttributes({
    //             categories: "",
    //         });
    //     });
    // }

    if (!emptyPosts) {
        return (
            <Placeholder
                icon="admin-post"
                label={"Recent Posts"}
            >
                {!Array.isArray(posts) ? (
                    <Spinner />
                ) : (
                    <div>
                        <div>{"No posts found."}</div>
                    </div>
                )}
            </Placeholder>
        );
    }

    const toolBarButton = [
        {
            icon: "grid-view",
            title: "Grid View",
            onClick: () => setAttributes({ postLayout: "grid" }),
            isActive: "grid" === postLayout,
        },
        {
            icon: "list-view",
            title: "List View",
            onClick: () => setAttributes({ postLayout: "list" }),
            isActive: "list" === postLayout,
        },
    ];

    return (
        <div>
            <BlockControls>
                <BlockAlignmentToolbar
                    value={wrapAlignment}
                    controls={["center", "wide", "full"]}
                    onChange={(value) => setAttributes({ wrapAlignment: value })}
                />
                <Toolbar controls={toolBarButton} />
            </BlockControls>
            <div
                className={`${className ? `${className} ` : ""}cj-recent-posts-block`}
            >
                {posts.map((post, i) => (
                    <article
                        key={i}
                        id={`post-${post.id}`}
                    >
                        <div>
                            <div className="cj-posts-block-text">
                                <header className="cj-posts-block-header">
                                    <PostHeadingTag className="cj-posts-block-title">
                                        {decodeEntities(post.title.rendered.trim()) || "(Untitled)"}
                                    </PostHeadingTag>
                                </header>
                                <div className="cj-posts-block-excerpt">
                                    {checkPostExcerpt && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: trimExcerpt(
                                                    post.excerpt.rendered,
                                                    excerptLength
                                                ),
                                            }}
                                        />
                                    )}
                                    {checkPostLink && (
                                        <p>
                                            {readMoreText}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};


export default registerBlockType( 'cgb/recent-posts', {
	title:  'Recent Posts',
	icon: 'grid-view', 
	category: 'common',
	keywords: [
		 'cj-blocks',
		 'Posts',
    ],
    attributes,

    getEditWrapperProps({ wrapAlignment }) {
		if (["full", "wide", "center"].includes(wrapAlignment)) {
			return { "data-align": wrapAlignment };
		}
	},
	
	edit: withSelect((select, props) => {
		const {
			categories,
			amountPosts
		} = props.attributes;

		const { getEntityRecords } = select("core");

		const getPosts = {
            categories: categories,
            per_page: amountPosts,
        };

		return {
			posts: getEntityRecords("postType", "post", getPosts),
		};

	})(PostList),

	save: () => null,
} );
