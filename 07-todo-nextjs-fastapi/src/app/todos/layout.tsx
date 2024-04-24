export default function Layout(props: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      <div>
        <h1>Layout</h1>
        {props.team}
        {props.children}
        {props.analytics}
      </div>
    </>
  )
}