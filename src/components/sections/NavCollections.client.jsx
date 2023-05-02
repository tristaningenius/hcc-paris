import { Button } from '../elements/Button'

export function NavCollections({ data }) {
  return (
    <nav className="px-3">
      <ul>
        {data.map((collection) => {
          return (
            <li className="mb-8 border-b border-trans-50" key={collection.id}>
              <Button
                variant="inline"
                className="text-5xl"
                to={`/collections/${collection.handle}`}
              >
                {collection.title.toUpperCase()}
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
