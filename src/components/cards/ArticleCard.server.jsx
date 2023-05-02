import {Image, Link} from '@shopify/hydrogen';
import {Text, Divider} from '~/components';

export function ArticleCard({blogHandle, article, loading}) {
  return (
    <li key={article.id}>
      <Link to={`/${blogHandle}/${article.handle}`}>
        <div className="flex flex-col gap-3">
          {article.image && (
            <Image
              widths={[300, 600, 800]}
              sizes="(max-width: 300px) 300px,
              (max-width: 600px) 600px,
              800px"
              alt={article.image.altText || article.title}
              className="aspect-[3/4] w-full object-cover"
              data={article.image}
              loading={loading}
              width="100%"
              height="100%"
              loaderOptions={{
                scale: 2,
                crop: 'center',
              }}
            />
          )}
          <Divider />
          <div>
            <Text color="sub">{article.publishedAt}</Text>
            <h2 size="section-s" className="text-2xl font-medium lg:text-3xl">
              {article.title}
            </h2>
          </div>
        </div>
      </Link>
    </li>
  );
}
