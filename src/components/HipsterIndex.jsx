function HipsterIndex({avgPopularity,tracks}){
    const result = avgPopularity(tracks)
    const hipsterScore = 100 - result
    return(
        <>
        <h2>Your Average Popularity is : </h2>
        <h3>{hipsterScore}</h3>
        </>
    )
}

export default HipsterIndex