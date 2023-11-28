document.addEventListener('DOMContentLoaded', ()=>{
    const {Subject,interval} = rxjs;
    const {takeWhile,tap} = rxjs.operators;

    //emit values when mins/hours need to decrement
    const hourSubject = new Subject();
    const minuteSubject = new Subject();
  
    //DOM elements
    const hours_input = document.getElementById('hours');
    const mins_input = document.getElementById('minutes');
    const secs_input = document.getElementById('seconds');
    const timerDisplay = document.getElementById('timer');
    const start_btn = document.getElementById('btn_start');

    const start_btnClick$ = rxjs.fromEvent(start_btn, 'click');//btn_start click observable
    start_btnClick$.subscribe(beginTimer);
  
    //update input_div inputs
    function updateDisplay(hours, minutes, seconds) { 
      hours_input.value = String(hours).padStart(2, '0'); //add zeros to ensure 2 digit inputs
      mins_input.value = String(minutes).padStart(2, '0');
      secs_input.value = String(seconds).padStart(2, '0');
      timerDisplay.textContent = `${hours_input.value}:${mins_input.value}:${secs_input.value}`;
    }
  
    function beginTimer(){
      const secondsInterval$ = interval(1000).pipe(
        tap(() => {
          if (secs_input.value > 0) {
            secs_input.value--;
          } else {
            if (mins_input.value > 0 || hours_input.value > 0) {
              secs_input.value = 59;
              minuteSubject.next();
            }
          }
          updateDisplay(hours_input.value, mins_input.value, secs_input.value);
        }),
        takeWhile(() => hours_input.value > 0 || mins_input.value > 0 || secs_input.value > 0)
      );
  
      const minutesSubscription = minuteSubject.subscribe(()=>{
        if (mins_input.value > 0) {
          mins_input.value--;
        } else {
          if (hours_input.value > 0){
            mins_input.value = 59;
            hourSubject.next();
          }
        }
      });
  
      const hoursSubscription = hourSubject.subscribe(()=>{
        if (hours_input.value > 0){
          hours_input.value--;
        }
      });
  
      const secondsSubscription = secondsInterval$.subscribe();
  
      secondsSubscription.add(minutesSubscription, hoursSubscription);
    }

  });