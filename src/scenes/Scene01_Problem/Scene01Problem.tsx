export default function Scene01Problem() {
    return (
      <section
        style={{
          background: "#F8F6F2",
          height: "300vh",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "8vw",
            paddingRight: "8vw",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(64px,8vw,120px)",
              lineHeight: "0.92",
              fontWeight: 300,
              color: "#1A1A1A",
              letterSpacing: "-0.05em",
              maxWidth: "900px",
            }}
          >
            You became
            <br />
            a photographer.
          </h1>
  
          <p
            style={{
              marginTop: "32px",
              fontSize: "clamp(26px,2vw,40px)",
              color: "#7A746D",
              fontWeight: 300,
            }}
          >
            Not an administrator.
          </p>
  
          <div
            style={{
              position: "absolute",
              right: "80px",
              bottom: "60px",
              fontSize: "14px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#999",
            }}
          >
            Scroll ↓
          </div>
        </div>
      </section>
    );
  }