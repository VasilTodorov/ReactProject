import { Link } from "react-router";

export default function Article(
    {        
        date,
        datetime,
        category,
        title,
        description,
        author,
        email,
        urlProfile
    }
) {
    return (
        <article              
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={datetime} className="text-gray-500">
                  {date}
                </time>
                <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  {category}
                </p>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <span>
                    {title}
                  </span>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900 hover:text-gray-600">
                    <Link
                      to= {urlProfile}
                    >
                      <span>{author}</span>
                    </Link>                    
                        
                                        
                  </p>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>
            </article>

    );
}