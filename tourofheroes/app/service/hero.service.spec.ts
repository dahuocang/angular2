import {Http,BaseRequestOptions,Response,ResponseOptions,RequestMethod,HttpModule,XHRBackend} from '@angular/http';
import {MockBackend,MockConnection} from '@angular/http/testing';
import {inject,TestBed,getTestBed,async} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {Hero} from '../domain/hero'


const fakedHeroes:Hero[]=[
  { id: 1, name: 'Windstorm' },
  { id: 2, name: 'Bombasto' },
  { id: 3, name: 'Magneta' },
  { id: 4, name: 'Tornado' }
]


describe('Http-HeroService (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        HeroService,
        MockBackend,
       BaseRequestOptions,
    {
      provide: Http,
      useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backendInstance, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([HeroService], (service: HeroService) => {
      expect(service instanceof HeroService).toBe(true);
  }));

  it('can instantiate service with new',inject([Http],(http:Http)=>{
  	expect(http).not.toBeNull('http should be provided');
  	let service=new HeroService(http);
  	expect(service instanceof HeroService).toBe(true,'new service should be ok ');
  }));

  describe('get Heroes test',()=>{
  	let service:HeroService=null;
  	let backend:MockBackend=null;
  	beforeEach(inject([HeroService,MockBackend],(heroSerivce:HeroService,mockBackend:MockBackend)=>{
  		service=heroSerivce;
  		backend=mockBackend;
  	}));
  	it('get heroes',(done)=>{

  		backend.connections.subscribe((connection:MockConnection)=>{
  			expect(connection.request.url).toEqual('api/heroes');
  			let options=new ResponseOptions({status: 200, body: {data: fakedHeroes}})
  			connection.mockRespond(new Response(options));
  		})

  		service.getHeroes2().subscribe((response=>{
  			expect(response.length).toEqual(4,'should be 4');

  		}))

  		service.getHeroes().then(response=>{
  			let resp=response;
  			expect(resp[0].name).toEqual('Windstorm','first hero should be Windstorm');
  			done();
  		});		
  	})
    it('get hero by id',(done)=>{

      backend.connections.subscribe((connection:MockConnection)=>{
        expect(connection.request.url).toEqual('api/heroes/1')
        let options=new ResponseOptions({status:200,body:{data:{id:1,name:'lisi'}}})
        connection.mockRespond(new Response(options));
      })
      service.getHero(1).then(response=>{
        expect(response.id).toEqual(1);
        expect(response.name).toEqual('lisi');
      })
    });
  });

})


// describe('hero service test ',()=>{

// 	let heroService:HeroService=null;
// 	let backend:MockBackend=null;


// 	beforeEach(()=>{
// 		TestBed.configureTestingModule({
// 			providers:[
// 			HeroService,
// 			MockBackend,
// 			BaseRequestOptions,
// 			{
// 				provide:Http,
// 				deps:[MockBackend,BaseRequestOptions],
// 				useFactory:(backend:MockBackend,defaulOptions:BaseRequestOptions)=>{
// 					return new Http(backend,defaulOptions);
// 				}
// 			}
// 			],
// 			imports:[
// 			HttpModule,HeroService]
// 		});
// 		TestBed.compileComponents();
// 	})
// 	beforeEach(inject([HeroService,MockBackend],(heroService:HeroService,mockBackend:MockBackend)=>{
// 		heroService=heroService;
// 		backend=mockBackend;
// 	}))

// 	it('#get heroes',(done)=>{
// 		let hSerivce:HeroService=getTestBed().get(HeroService);
// 		backend.connections.subcribe((connection:MockConnection)=>{
// 			let option=new ResponseOptions({body:JSON.stringify({success:true})});
// 			connection.mockRespond(new Response(option));
// 		})
// 		// backend.connections.subcribe((connection:MockConnection)=>{
// 		// 	let option=new ResponseOptions({body:JSON.stringify({success:true})});
// 		// 	connection.mockRespond(new Response(option));
// 		// })
// 		heroService.getHeroes().then((response)=>{
// 			expect(response.length).toEqual(1);
// 			done();

// 		})
// 	})

// })


