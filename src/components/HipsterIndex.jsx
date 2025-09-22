function HipsterIndex({tracks}){
    const result = calcAvgPopularity(tracks)
    const hipsterScore = 100 - result
    const hipsterCategory = getHipsterCategory(hipsterScore)

    function getHipsterCategory(hipsterScore){
        if(hipsterScore >= 90){
            return "Ultra Hipster"
        }else if(hipsterScore >= 70){
            return "Pretty Hipster"
        }else if(hipsterScore >= 50){
            return "Balanced Taste"
        }else if(hipsterScore >= 30){
            return "Mainstream-ish"
        }else if(hipsterScore >= 0){
            return "Full Mainstream"
        }
    }

    
    function calcAvgPopularity(userTracks){
        if (!userTracks?.items?.length) return 0;

        const total = userTracks.items.reduce((acc, item) => acc + item.popularity, 0);
        const average = total / userTracks.items.length;

        return average;
    }
    return(
        <>
        <h2>Your Hipster Index is : </h2>
        <h3>{hipsterScore}</h3>
        <p>{hipsterCategory}</p>
        </>
    )
}

export default HipsterIndex