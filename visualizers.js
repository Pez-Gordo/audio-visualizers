const container = document.getElementById('container')
const canvas = document.getElementById('canvas1')
const file = document.getElementById('fileupload')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let audioSource
let analyser

container.addEventListener('click', function() {
    const audio1 = document.getElementById('audio1')
    //audio1.src = 'data:audio/x-wav;base64,UklGRj4TAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0Ye0SAAB/f3+Af4CAgH9/gH9/f4B/blRieY2hssTS4u/6/PDfzbuqmYl3aE5LYXGDkaGvvc3b5eLWx7WkkYFuXUUyRFptfY6frb3N297Tw7GgjHlpVUInLERYbHyPn6+/z9jTw7GfjnloVkUqHjRJXm+BlKS0xdPUx7WikX5sWkkzGic9UmZ2iZqru8rRybmmlIJvXks7IBszRltsf5ChssLNy72smIdzY1BAKRUnPFBjdYeXqbrIzMGwnox6Z1hFMxYYMkdbbICQoLHAzMu+rpyNfGxeTT0nDBo0SFtre4uaqrnHzsa4ppWFdWVXRTUXDCY8UmNyg5KhscDNzMCvnY5+bF5OPSgLFDBFWWh5iZent8XOx7mnlod3ZlhGNxsMJDpPYXGBkaCwv83Pw7SikoNyYlNCLhAXMUdaanqLmqi5yNLMvqybi3tqXUs7IA0kO1BicoKSoLHAztHGt6SUhHRkVUMyExQvRFlpeYmYp7jH0s7Brp2NfWxfTj4lDR43TF9ufIqYpbTC0NTMvq6cj39xZFdFNx0NIzlLXmx7ipiks8HO1M3AsJ+Sg3RmWUc5Iw0dNUlcaniGlKGwvszTz8GyoZKEdWhbSzsmDRoxRFhndoWUoK69ytTRxLamlol5a15OPy4TFzFFWGh1hJOgrr7L1dXJuqmajH5vYlNDMhYTLEFVZXSDkZ2rusjU1su9rZ2PgHFjVkU2GxEqPlJicH+Om6m4xdHWzcCvnpGDdGZYSDkgECQ6S1tpdoORnKi1wczU1Mm9r6CUh3lsYVRHOygTHzVGVmVxfoyYo7C8x9HVzsK1ppmNgHJmWk1AMRgUKz1OXWt3hZKdqbXBy9PRxrqsnZGFd2peUkQ4IxEhN0dXZnKAjZmlsb3I0tXNwbWmmY1/cWVaTEAxGBkxQlJhb3uJlqGtusXQ1tPHu6yekoV3al5SRTkiEyY7S1tpdYKQnKezv8rU1czAsqOWinxvY1dKPi4WHDNEVGJvfIqXoaq0vsfP087Fuq6il4yAc2lfVUpANB8VJjpHVmJueISRnKWvucHJ0dLLwbaqn5SJfG9lW1JGPS4ZGS4+S1hkcHuIlJ6nsbvDzNHPx72xpZmOg3drYVdMQTgnFR81Q1FfanWAjpmjrLfAyNDTz8W7r6OYjYFzaV9WS0E1HxgqPElXZG96h5Odp7C6w8zS0svBtqqek4l8b2VbUEU9LhkbMUFOW2ZyfYuXoau1vsXO0s/GvLGlmpCGe3BnXlZNQzwzIBYkOEVRXGdxe4OPmaKpsrvCyM/T08zEvLKmnJKJfnNqYVlQRz82JBYeM0FMWGNsdn+KlZ2mrbe/xsvQ0czFvLKnnZKJgHRqYVpRRz84JxcYLT5IVGBrdH2Ik5ukrLW+xczR09DIwLesoZeNhHhvZV1VTEI8LxwXKTtHUl5pc3yFkZqjqrS9xMnQ0tHJwbmuopiOhnpvZ15WTUM8MR0UIzdDT1tmb3mCjZagp621vcPJ0NXW1MvCubGlnJSNhX91bGVeV1FHQTgxHg8NHzRBTVZhaXJ5gImSmaCmrbS9xMvS2tzZz8S6saedlY2FfnRsZV5YUUdAODIhEAwdMz9KVF9ncHh/h5CXnqWss7zDytHZ3NnQxry1qqCYkIiBeHBoYVpUSkM7NSQSDhszP0tUYWlxeICHkZigpq2zvcPL0tnd29LIvbSqoJeQiIF3b2hhWlRLQjozJBAJEyw7R1FdZ292fYKJkJaboaarsbnAx87V2+Hg39bOxLuyqp+YkYuFgHpza2dhXFZRSUE6NS4nEQkIEyw5RU1WX2hudHqAhIuSmJ2iqK2zvcXM0tjd4eDe1czCurGonZaQioR/eXFrZmBbVVBIQDk0LSUPCQgXLz1IUFlianB3fIKHjpWan6WqsLfAx83U2d7i4d7VzMK6saiel5GLhYB6cmxnYVtWUEhAOjQtIw0IBxkvO0ZOV2Fpb3Z8goeOlJmdn6aorrK2v8HIy87U1Nnc2tjWzcjBubWsqaCYlI2KhH98dnVtaGVfXldVUU1LQj87NzYvLh8RDxETJzg/Sk1WWV9obHJ2eoCCiIqRl5qho6itr7a3v8TGzMzS1Nfb29nX0crGvLiyq6ecmJGNioOBe3hza2ljYVxXVU9NSEE/ODgyLioWDxAQHDQ7RkxSWl1nbHF3eoGDiIyOl5qfpKeur7S3u8PFyszP1NXa29rY1s3Jwru3r6uqpJuZl5GMjImCfn55c3FxaGFhX1pZWlhUVFVST1BPSEVHREA/QDw4OTclHRwdHiEiM0VJTVRaW19maWlweHl7gYWFiI+SkpednZ6mq6qssLGvsra1tLi6uLrAwsDDxsXFyMvKy8/Qz87NzMrFv768tbGwrKajo5uTkpCJhYWBeXd2cWtraV9bXFlUVFZTUFFSTkxOS0VERUI+Pz46NjgzIRwcHR8hIzhFR0xUWFhdZGVmb3V2d3d6gYOEhYWFho+UlJWUlJSZoKGhoaGgpK+ys7Gwr66ztrW0srGvsre3trSzsbK3uLe1tLOyuL28u7m4trm9vLy6ube3vL69vLu6uL3AwMC/vr28u7u5ubi3tq6pqKenpqael5WTk5GRjYSCgYCAgH5zbWxrbGtsZl9eXl5eX11UUlJSVFVWUExNTlBRU05GRkZISUtLRkVGR0lKTEdERUZHSUtJRUZHSktNTUdFRkZISEpGQ0NEQz48PjQjICAhIiMpP0lMUVlcXWNpam13fHyAhoiJj5WWmJ6hoKSsrq2ws7Kytri2t7u7ub7DwsLFyMbHy8zLztHQz87My8jBvr24sa+uqKOjn5aSkY2GhYR9eHd1bmprZVxbW1dUVVZRUFJRTU1OSUNFREE+QD45ODosHh0dHiEhK0FIS1FZWl1jaGhtdnl6f4SFh46Tk5adn56krKyrr7KwsbW2tLe6urnAw8LDx8jHys7OztLU09LOx8S8trOrqJ6YlI2LhIB8d3VtaWVgX1hWUk5LQkA6NzYuLRwQDxEUKzpCTE9YW2Nrb3Z4foOFi42Vmp2kpayvsri5wcXIzM3T1Njb2tnW0MnEu7iwq6Wbl5CMiIF/eXZxaWhhX1pWVE5MRkA+NzcwLycVEBESIDc9SU1UW19pbXN4e4KEiY2QmJuhpaivsLa4vcTGzM3Q1dXb29rY1czIwLm0rKmfmZSNi4SBfXh2bWlkX1lTTkhAOTQtKBoJCAoiMz9IUFljaXB2fIGHjpWaoKWrsLnByc7W2uDh4NnQx761raKak42HgXx1bmljXlhTTEQ9NzArGgoIDCU0QElSWmRqcXd9goiPlpuhpauxusLKz9bb4eHf2M/GvbWsoZmTjYaBfHVtaWNeWFRMRD03MCoXCgkPKThETVZeaG51eoCFi5OZnqOorrS9xczS2Nzi4d/Xz8W8s6qgmZOMhoF7dG1nYlxWUEpAODAoEwkOJjhETllja3R7gouTmqGor7e/xs3U29zWzMK4sKSbk4uEfXNsZF1XT0Y/Ny8ZDhAmOEROWWRsdHuCi5Sboqmvt7/GzdTb29bMwrevpJuTi4R8cmtkXVZQRj82LxwODiE3Q05XYmpyeoGKk5mhp662v8XN1Nze2c/Fu7Oon5aOhn92bmdgWFJIQTkzIBAPIjZCTVdia3N7goqTmqGorra+xcvS2NnVzcS7s6ielo6Gf3RrYlpTST84KxcTJjhEUFxncXqEj5mhqbK7wsjO0c/IwLetoZeOhXluZl1VTEM7MB0VJDhDT1tmb3mDjpehqLC6wsfN0dDKwrmvo5mPhntwZ15XTUQ8MyAUHDJAS1dibHZ/i5Sdpa23v8XM0NHMxLyyppyTiX90amFaUkhAOSkXGy8/SlZibHZ/iZSdpq23v8XM0dPPx7+2q5+WjIN3bWVcVEtCOy0aFyo7RlJeaHJ8hpGao6mxusPL0tPMwrirn5SJe29lW1FGPi4aHTJCT1xoc3+MmKKrtb7Hz9TRyL6zppuQhHdsYlhNQzklFyM5RlVhbXiDkJulrrnBydHTzsO5rKGWi35xZlxTSD8yHBcrPUlXY296h5OdprC6wsvS0cq/taickYZ6bmNaT0Q7LBgdM0NRX2p1gI2Zo6y2v8fP1NDHvbGlmo+DdmthWE1COCMXJjpHVWJueIWRm6WuucLL0tTOw7msoJWKfnFnXFBDNx8VKTxMW2l1g5GdqLXAy9TTyr6woZWIe21iVkg9KxUeNUVWZXF+jJmksL3H0tbQxbeom4+Cc2dcT0I1HBYsPk9ebHiGk5+qt8LM1NLIvK2fkoZ4a19TRjomEiA2RlZlcX+NmaSwvMfR1M3CtKaZjH9xZVpNQDIZGC9CUmFue4mWoay6xdDX1Mm8rqCTh3hsYFRGOyUUJTpKW2h1gpCcp7TAy9TWzsK0pZiLfnBkWEs+LhUbNEdaaXaFlKGwv8zW1sq7qpuNf3FjVUQ0GBUuQlZndYSSn628ytbYzcCvn5GCc2VYSDkeFCxAVGRzgZCdq7vI1NnQwrGgk4V2aFpKOyEQJTxPYW9+jJmmtsTR19DDs6KUhXZoXEw9JhEiOUtdbHuKmKa1wtDY08a2pZeJemxfUEAuFB43Sl1te4mXpLPC0NnXyrupmox8b2JTQzEWGzRGWWl4hpWisL/N2NfLvKucjn9wY1NDMxYbNktfbn6Pnq6/ztjSxLGgkYFwYlFBKBMnP1RmdYeWpbXF1NjNvauainpqW0o5Gxs1SV1tfo6drL3M2NTHtaOTg3JkU0MqEyY+U2V0hZWjs8PR1829q5qKeWpbSTkaFTBFWmp7i5qpusnV08a1o5ODc2RURC4TIjtQY3KDk6Kyw9LZ0MGuno5+bWBOPSEWL0ZaanuMm6m7ytfXybmnl4Z2Z1dGMhciO05icYKSobHAz9fPwbCejntqWkcxGCdAVWd5jZyuv87UyrqnloNwYU89IB84TGFxhZanuMnU0cKwnY15aFZGLRsvRFprfZChssLR08m4pZOBbl1MOh8lPFBldYmZq7zL1M2+rJmHdGRQQCYcMkZbbYCRorTE0dDEs6CPe2tZRzMaJz9TZniMnK2+ztTLu6mXhXJkUD8jHzhMYXKGl6i5ydTRw7GfjnppWEcuGy5DWWt9kKGxwtDUybmmlYJwX048HyM6TmR1i5yvwNDRxLKei3ZjUD0hKEBUaX2So7fH082+qpeCb1xKMh0xR11whpmsvs7TyLejkXtpVUQnIzxQZXiOn7PE0tDDsJyIdGFOOR4rQ1hsgJSmucnSy7qmlH5rWEYsHDNIXnGHma2+ztHFs5+Md2VRPyMkPVFmeY+gtMXSzsCsmYVxXkw1Hy9GW2+El6m8zNTKuqaUfmtXRiogOE1jdoudsMLR0sWyn4t2ZFE9IShAVWl9kqO2x9PMu6aQeWVROh4rRV1yiJywxNLNvKeTfWhUPB4qQ1pvhZqvw9PQwKuWf2tWQSImQFhuhJmtwdLSwayYgm5ZRCQlP1VrgJaqv9HSxLCbhW9aRighOlFofpOnu83Sxa+bhXBbSCsgOE5leY+juczSx7OeiXNdSi0dM0tieI+jt8rTyrahi3ZiTzUgNExid42htcrVzLmlkHplUDYeL0dedIuftcnWz72mkXtmUTkcKUVccYids8fYqHBbTEdDRENFRUdHSEdISEpLTU1OTU5PUFFSUlNTVFRVVlhYWlpcXF5eYGFiY2RkZWZnZ2hpamprbG1tbm5vcHBxcnJzc3R0dXV2dnd3eHh5eXp6ent7e3t7e3x8fH19fX5+fn9/f4CAgICBgYGCgoKCg4ODg4SEhISFhYWFhoaGhoeHh4eIiImJiYmJiYmJiYqKioqKioqKioqKioqLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKioqKioqKioqKioqKioqKioqKioqJiYmIiIiIiIiIh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4iIiImJiYiIiIiIiIiIiIiIiIiIh4eHh4eHh4eHh4eHh4eHh4eHh4eHhoaGhoaGhoaGhoWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEhISEhISEhISEhISEhISEhISFhYWFhYWFhYWEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIODg4OCgoKCgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgoKCgoKCgoKCgoKCgoKCgoKCgoODhIODg4ODg4ODg4ODg4ODg4ODg4OCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYKCgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYCAgIAATElTVBgAAABJTkZPSUNSRAwAAAAxOTk0LTExLTMwAEVmYWN0BAAAAAABUIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
    const audioContext = new AudioContext()
    audio1.play()
    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser()
    audioSource.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = 512
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const barWidth = 15
    let barHeight
    let x 

    function animate() {
        x = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        analyser.getByteFrequencyData(dataArray)
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)
        requestAnimationFrame(animate)

    }
    animate()
})

file.addEventListener('change', function() {
    const files = this.files
    const audio1 = document.getElementById('audio1')
    audio1.src = URL.createObjectURL(files[0])
    audio1.load()
    audio1.play()

    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser()
    audioSource.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = 512
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const barWidth = 15
    let barHeight
    let x 

    function animate() {
        x = 0
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        analyser.getByteFrequencyData(dataArray)
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)
        requestAnimationFrame(animate)

    }
    animate()
})

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.5
        //changing colors based on the frecuency
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(i + Math.PI * 8 / bufferLength)
        const hue = i 

        /*
        const red = i * barHeight / 30
        const green = i / 2
        const blue = barHeight
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, barWidth, 15) 
        */
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
        ctx.fillRect(0, 0, barWidth, barHeight)
        x += barWidth
        ctx.restore()
    }
}
