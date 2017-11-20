# Stórt Verkefni 2
# Tillaga að útfærslu
## index.html
---
### init
    init(){
        sér um að setja upp dót ,setja e.t.v. eventlistener og fleira.
        Kallar á construct
    }
### Construct
    function Construct(){
        Kallar á JSONparser?
        Sér um að setja upp grunnsíðu og kallar á func's í réttri röð o.s.frv.
        Kallar á Category með for-lykkju eða sambærilegu til að mynda flokkana. 
    }
### Category
    function Category(title, id[]){
        inntak: titill á flokki og array af video id's.
        kallar á getVideo til að fá element með poster, duration, title, og fleira. Ítrar yfir þau 
        video sem eiga að vera með for-lykkju eða svipuðu.
    }
___
##### html element frá category:
    
    <section class='category'>
        <div class = 'category__name'>
            <h2>Category titill</h2>
            .   
            .   (Mörg element frá getVideo)
            .   (o.s.f.r.v)
            .
        </div>
        Eitthvað border dot hér á milli?
    </section>
### getVideo
    function getVideo(id){
        inntak: id af video
        skilar element með titil, poster, duration og fleira.
    }
---
##### html element frá getVideo

    <div  class = 'video'>
        <img src= ../poster.jpg>
        <h3 class='vidtitle'>  Titill á video   </h3>
        <p class='age'>    Aldur á videoi  </p>
    </div>    
### JSONparser
    function JSONparser(url){
        inntak: url að JSON skrá.
        skilar öllu helstu upplýsingum sem þörf er á.
        e.t.v, væri líka hægt að útbúa einhversskonar JSON "leitarvél" sem hefur í inntaki því sem er leitað af
        og skilar niðurstöðum??? skoða nánar
    }
## video.html
---
### player 
    function player(id){
        inntak: video id.
        sér um að spila video.
    }