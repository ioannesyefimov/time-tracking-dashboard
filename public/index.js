
const periodBtns = document.querySelectorAll('.side-card-period')
const sideCard = document.querySelector('.side-card-sect2')
const activityCards = document.querySelectorAll('.activity-card')
const activityType = document.querySelectorAll('.type-activity')
const activityTime = document.querySelectorAll('.activity-time')
const periodTime = document.querySelectorAll('.period-time')
const periodTimeHrs = document.querySelectorAll('.period-time-hours')






async function getData(data){
    const resp = await fetch(data)
    const dataObj = await resp.json();


    const clearActivities = () => {
        const activities = document.querySelectorAll('.activity-card')
        activities.forEach(act =>  act.remove())
        const activityCards = document.querySelector('.activity-cards');
        if(activityCards !== null ){
            activityCards.remove()
        }
    }

    const renderCards = (data, clickedOption) => {
        clearActivities()
        
        const mainInnerContainer = document.querySelector('.main-inner-container')
        const activityCards = document.createElement('div')
        activityCards.classList.add('activity-cards')
        mainInnerContainer.appendChild(activityCards)


        const calcTimeFrame = (option) => {
            if(option === 'daily'){
                return 'Yesterday'
            } else if (option === 'monthly'){
                return 'Last Month'
            } else if (option === 'weekly'){
                return 'Last Week'
            }
        }
            data.forEach(activity  => {
                const name = activity.title
                const activityCLass = name.toLowerCase().replace(' ', '-')
                const timeFrameData = activity.timeframes[clickedOption]
                const previousTimeFrame = calcTimeFrame(clickedOption)
                console.log(activityCLass)
                const activityCard = document.createElement('div')
                activityCard.classList.add('activity-card');
                const stringToInject = `
                
                <div class="image-card img-${activityCLass}"></div>
                <div class="card-wrapper">
                  <div class="main-card-wrapper">
                    <p class="type-activity">${name}</p>
                    <button class="menu"><img src="./images/icon-ellipsis.svg" alt=""></button>
                  </div>
                  <h2 class="activity-time">${timeFrameData.current}hrs</h2>
                  <div class="time-period-wrapper">
                    <span class="period-time">${previousTimeFrame}  </span>
                    <p class="period-time-hours">${timeFrameData.previous}hrs</p>
                  </div>
                </div>
                
                `
                activityCard.innerHTML = stringToInject
                activityCards.appendChild(activityCard)
            })

        }
    
        
    const activateClickedBtn = (btn) => {
       periodBtns.forEach(b => b.classList.remove('active'))
    
       btn.classList.add('active')
    }       
    periodBtns.forEach(button=> {
        button.addEventListener('click', ()=> {
            activateClickedBtn(button)
            const clickedOption = button.getAttribute('data-period')
            console.log(clickedOption)
            renderCards(dataObj ,clickedOption)
            
        })
    })     


}

getData('./data.json')