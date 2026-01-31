import { PortableText } from '@portabletext/react'
import { urlFor } from '../../lib/sanity'

const components = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <figure className="my-8">
                    <img
                        src={urlFor(value).width(800).fit('max').auto('format').url()}
                        alt={value.alt || 'Project Image'}
                        className="rounded-xl w-full h-auto border border-neutral-800"
                    />
                    {value.caption && (
                        <figcaption className="mt-2 text-center text-sm text-neutral-500">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        }
    },
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-8 text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-6 text-white">{children}</h3>,
        normal: ({ children }) => <p className="mb-4 text-neutral-300 leading-relaxed">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 py-1 my-6 italic text-neutral-400 bg-white/5 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc ml-5 mb-4 text-neutral-300 space-y-1">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal ml-5 mb-4 text-neutral-300 space-y-1">{children}</ol>,
    },
}

const CaseStudyContent = ({ value }) => {
    return (
        <div className="prose prose-invert max-w-none">
            <PortableText value={value} components={components} />
        </div>
    )
}

export default CaseStudyContent
