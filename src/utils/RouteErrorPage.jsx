// import { useRouteError } from "react-router-dom";

export default function RouteErrorPage() {
    // const error = useRouteError()
  
    return (
      <section>
        <div id="error-page" className="text-center p-5">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            {/* <i>{error.statusText || error.message}</i> */}
          </p>
        </div>
      </section>
    )
  }
  