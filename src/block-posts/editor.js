import FeaturedImage from "./image";
// import moment from "moment";

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;
const { decodeEntities } = wp.htmlEntities;

export default class PostGridBlock extends Component {
	render() {
		const {
			attributes: {
				checkPostImage,
				checkPostAuthor,
				checkPostDate,
				checkPostExcerpt,
				checkPostLink,
				excerptLength,
				readMoreText,
				postLayout,
				columns,
				postTitleTag,
			},
			className,
			posts,
		} = this.props;

		const SectionTag = "section";
		const PostTag = postTitleTag;

		return [
			<div>
				<SectionTag
					className={`${className ? `${className} ` : ""}ub-block-post-grid`}
				>
					<div
						className={`ub-post-grid-items ${
							postLayout === "list" ? "is-list" : `is-grid columns-${columns}`
						}`}
					>
						{posts.map((post, i) => (
							<article
								key={i}
								id={`post-${post.id}`}
								className={`post-${post.id}${
									post.featured_image_src && checkPostImage
										? " has-post-thumbnail"
										: ""
								}
								`}
							>
								<div>
									{checkPostImage && post.featured_media ? (
										<div className="ub-block-post-grid-image">
											<FeaturedImage
												{...this.props}
												imgID={post.featured_media}
												imgSizeLandscape={post.featured_image_src}
											/>
										</div>
									) : null}
									<div className="ub_block-post-grid-text">
										<header className="ub_block-post-grid-header">
											<PostTag className="ub-block-post-grid-title">
												<a href={post.link} target="_blank" rel="bookmark">
													{decodeEntities(post.title.rendered.trim()) ||
														__("(Untitled)", "ultimate-blocks")}
												</a>
											</PostTag>
										</header>
										<div className="ub-block-post-grid-excerpt">
											{checkPostExcerpt && (
												<div
													dangerouslySetInnerHTML={{
														__html: cateExcerpt(
															post.excerpt.rendered,
															excerptLength
														),
													}}
												/>
											)}
											{checkPostLink && (
												<p>
													<a
														className="ub-block-post-grid-more-link ub-text-link"
														href={post.link}
														target="_blank"
														rel="bookmark"
													>
														{readMoreText}
													</a>
												</p>
											)}
										</div>
									</div>
								</div>
							</article>
						))}
					</div>
				</SectionTag>
			</div>,
		];
	}
}

// cate excerpt
function cateExcerpt(str, no_words) {
	return str.split(" ").splice(0, no_words).join(" ");
}
