import {Http,BaseRequestOptions,Response,ResponseOptions,RequestMethod,HttpModule,XHRBackend} from '@angular/http';
import {MockBackend,MockConnection} from '@angular/http/testing';
import {inject,TestBed,getTestBed,async} from '@angular/core/testing';
import {HeroService} from './hero.service';



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

  it('can instant	iate service when inject service',
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
  			let options=new ResponseOptions({
  				body:JSON.stringify({id:1,name:'zhangsan'})
  			})
  			connection.mockRespond(new Response(options));
  		})
  		service.getHeroes().then(response=>{expect(response.length).toBe(1);expect(response[0].id).toBe(1);expect(response[0].name).toBe('zhangsan')});
  		done();
  	})
  })
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


