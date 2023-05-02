import { Button } from './Button'

export function LogoutButton(props) {
  const logout = () => {
    fetch('/account/logout', { method: 'POST' }).then(() => {
      if (typeof props?.onClick === 'function') {
        props.onClick()
      }
      window.location.href = '/'
    })
  }

  return (
    <Button variant="outlined" {...props} onClick={logout}>
      Se déconnecter
    </Button>
  )
}
