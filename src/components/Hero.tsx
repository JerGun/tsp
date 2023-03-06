import React, { useState } from "react"

export const Hero = () => {
  const [costMatrix, setCostMatrix] = useState([
    [0, 56, 30, 59, 41, 95, 36, 34],
    [56, 0, 29, 64, 23, 70, 64, 20],
    [30, 29, 0, 73, 50, 48, 78, 60],
    [59, 64, 73, 0, 18, 37, 81, 60],
    [41, 23, 50, 18, 0, 45, 94, 68],
    [95, 70, 48, 37, 45, 0, 80, 75],
    [36, 64, 78, 81, 94, 80, 0, 84],
    [34, 20, 60, 60, 68, 75, 84, 0],
  ])
  const [cities, setCities] = useState(8)
  const [result, setResult] = useState({ minTours: [] as any[], minCost: 0 })

  function permute(arr: any): any {
    let permutations = []
    if (arr.length === 0) {
      return []
    } else if (arr.length === 1) {
      return [arr]
    }
    for (let i = 0; i < arr.length; i++) {
      let subArray = arr.slice(0, i).concat(arr.slice(i + 1))
      let subPermutations = permute(subArray)
      for (let j = 0; j < subPermutations.length; j++) {
        permutations.push([arr[i]].concat(subPermutations[j]))
      }
    }
    return permutations
  }

  function calculateCost(tour: any) {
    let cost = 0
    for (let i = 0; i < tour.length - 1; i++) {
      cost += costMatrix[tour[i]][tour[i + 1]]
    }
    cost += costMatrix[tour[tour.length - 1]][tour[0]]
    return cost
  }

  function solveCircularTSP(cities: number) {
    let citiesList = Array.from({ length: cities }, (_, index) => index)
    let tours = permute(citiesList)

    let minCost = Infinity
    let minTours = []

    for (let i = 0; i < tours.length; i++) {
      let cost = calculateCost(tours[i])
      if (cost < minCost && tours[i][0] === 0) {
        minCost = cost
        minTours = [tours[i]]
      } else if (cost === minCost && tours[i][0] === 0) {
        minTours.push(tours[i])
      }
    }

    setResult({ minTours, minCost })
  }

  const getNumOfRows = () => {
    return "grid-rows-" + cities
  }

  const formatResult = (tour: any) => {
    return tour
      .map((num: any) => num + 1)
      .concat(tour[0] + 1)
      .join("-")
  }

  return (
    <div className="h-full min-h-screen w-full flex flex-col items-center p-5 space-y-5  bg-subBackground">
      {cities > 0 ? (
        <div className="space-y-2">
          <div className="w-full flex justify-end items-end space-x-2">
            {[...Array(cities + 1)].map((n, i) => (
              <input
                className={`h-10 w-10 flex text-center rounded-lg text-white bg-customGrayHeavy`}
                value={i !== 0 ? i : "i/j"}
                disabled
              />
            ))}
          </div>
          <div className={`grid grid-flow-col auto-cols-max gap-2 rounded-lg`}>
            <div className="space-y-2">
              {[...Array(cities)].map((n, i) => (
                <input
                  className={`h-10 w-10 flex text-center rounded-lg text-white bg-customGrayHeavy`}
                  value={i + 1}
                  disabled
                />
              ))}
            </div>
            {[...Array(cities)].map((rowIndex, i) => (
              <div className={`grid ${getNumOfRows()} gap-2`}>
                {[...Array(cities)].map((colIndex, j) => (
                  <input
                    type="number"
                    className={`h-10 w-10 flex text-center rounded-lg ${
                      i === j ? "text-white bg-customGrayLight" : "text-black bg-white"
                    }`}
                    disabled={i === j}
                    value={i === j ? 0 : costMatrix[i][j]}
                    onChange={(e) => {
                      const newMatrix = [...costMatrix]
                      newMatrix[i][j] = parseInt(e.target.value)
                      newMatrix[j][i] = parseInt(e.target.value)
                      setCostMatrix(newMatrix)
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {cities > 0 ? (
        <button
          className="font-maledpan font-bold text-lg text-white"
          onClick={() => {
            const newCost = [...costMatrix]
            costMatrix.forEach((cost) => {
              cost.fill(0)
            })
            setCostMatrix(newCost)
          }}
        >
          ล้างทั้งหมด
        </button>
      ) : null}

      <form action="" className="flex items-center">
        <div className="h-12 px-10 flex items-center space-x-5">
          <p className="font-maledpan font-bold text-lg text-white">เมือง</p>
          <input
            type="number"
            className={`h-10 w-10 flex text-center rounded-lg text-black bg-white`}
            value={cities}
            onChange={(e) => {
              setCities(parseInt(e.target.value))
              if (costMatrix.length < parseInt(e.target.value)) {
                for (let i = 0; i < parseInt(e.target.value) - costMatrix.length + 2; i++) {
                  costMatrix.push(Array(parseInt(e.target.value)).fill(0))
                  const newCosts = [...costMatrix]
                  newCosts.forEach((newCost) => (newCost[costMatrix.length-1] = 0))
                  console.log("🚀  newCosts:", newCosts)
                  setCostMatrix(newCosts)
                }
              }
            }}
            min={0}
          />
        </div>
        <button
          className="h-12 px-8 rounded-md font-maledpan font-bold text-lg bg-primary"
          onClick={(e) => {
            e.preventDefault()
            solveCircularTSP(cities)
          }}
        >
          ประมวลผล
        </button>
      </form>
      <div className="flex flex-col justify-center items-center p-5 space-y-5 rounded-lg text-white font-bold text-lg bg-subInput">
        <div className="w-fit flex justify-center items-center space-x-5 ">
          <p className="font-maledpan">เส้นทางที่เป็นไปได้ทั้งหมด</p>
          <div className="min-h-10 py-2 px-5 rounded-md text-black bg-white">
            {result.minTours.map((tour: any[], i: any) => (
              <p>{formatResult(tour)}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <p className="font-maledpan">ระยะทาง</p>
          <p className="min-w-10 p-2 flex justify-center rounded-md text-black bg-white">{result.minCost}</p>
        </div>
      </div>
    </div>
  )
}
