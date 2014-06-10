( function ( Ember, window, document, undefined ) {
    'use strict';

    ////////////////////
    // Initialization //
    ////////////////////
    var DressKart = Ember.Application.create( {
        LOG_TRANSITIONS: true,
        LOG_ACTIVE_GENERATION: true,
        LOG_VIEW_LOOKUPS: true
    } );

    DressKart.ApplicationSerializer = DS.LSSerializer.extend();

    DressKart.Store = DS.Store.extend( {
        adapter: DS.LSAdapter.create( {
            namespace: 'shoppingcart'
        } )
    } );

    ////////////
    // Models //
    ////////////
    DressKart.Order = DS.Model.extend( {
        pdtId: DS.attr( 'number' ),
        title: DS.attr( 'string' ),
        imageUrl: DS.attr( 'string' ),
        price: DS.attr( 'number' ),
        quantity: DS.attr( 'number' ),
        cost: function () {
          return this.get('quantity') * this.get('price');
        }.property('@each.cost')
    } );

    ////////////
    // Routes //
    ////////////
    DressKart.Router.map( function () {
        this.route( 'index', {
            path: '/'
        } );
        this.route( 'men', {
            path: '/men'
        } );
        this.route( 'women', {
            path: '/women'
        } );
        this.route( 'kids', {
            path: '/kids'
        } );
        this.route( 'product', {
            path: '/dress'
        } );
        this.route( 'product.detail', {
            path: '/dress/:pdtId'
        } );
        this.route( 'cart', {
            path: '/cart'
        } );
    } );

    DressKart.BaseRoute = Ember.Route.extend( {
        rootUrl: '',
        model: function () {
            return Ember.$.getJSON( this.get( 'rootUrl' ) )
                .then( function ( json ) {
                    return json.data;
                }, function () {
                    console.error( 'An error occurred in this request' );
                } );
        },
        setupController: function ( controller, model ) {
            controller.set( 'dresses', model );
            controller.set( 'filteredDresses', model );
        }
    } );
    DressKart.MenRoute = DressKart.BaseRoute.extend( {
        rootUrl: 'json/dressMen.json'
    } );
    DressKart.WomenRoute = DressKart.BaseRoute.extend( {
        rootUrl: 'json/dressWomen.json'
    } );
    DressKart.KidsRoute = DressKart.BaseRoute.extend( {
        rootUrl: 'json/dressKids.json'
    } );
    DressKart.ProductRoute = DressKart.BaseRoute.extend( {
        rootUrl: 'json/dresses.json'
    } );
    DressKart.ProductDetailRoute = DressKart.ProductRoute.extend( {
        model: function ( params ) {
            return Ember.$.getJSON( this.get( 'rootUrl' ) )
                .then( function ( json ) {
                    var data = json.data;
                    var product;
                    data.map( function ( d ) {
                        if ( d.id === +params.pdtId ) {
                            product = d;
                        }
                    } );
                    return product;
                }, function () {
                    console.error( 'An error occurred in this request' );
                } );
        },
        setupController: function ( controller, model ) {
            controller.set( 'dress', model );
        }
    } );
    DressKart.CartRoute = Ember.Route.extend( {
        model: function () {
            return this.store.findAll( DressKart.Order );
        },
        setupController: function ( controller, model ) {
            console.log( model );
            controller.set( 'items', model );
        }
    } );

    ////////////
    // Views //
    ////////////
    DressKart.MenView = Ember.View.extend( {
        templateName: 'dress'
    } );
    DressKart.WomenView = Ember.View.extend( {
        templateName: 'dress'
    } );
    DressKart.KidsView = Ember.View.extend( {
        templateName: 'dress'
    } );
    DressKart.ProductView = Ember.View.extend( {
        templateName: 'dress'
    } );
    DressKart.ProductDetailView = Ember.View.extend( {
        templateName: 'dressDetails'
    } );

    /////////////////
    // Controllers //
    /////////////////
    DressKart.BaseController = Ember.ArrayController.extend( {
        searchText: '',
        dresses: [],
        actions: {
            query: function () {
                var text = this.get( 'searchText' );
                if ( text ) {
                    var dresses = this.get( 'dresses' )
                        .filter( function ( dress ) {
                            if ( dress.title.toLowerCase()
                                .indexOf( text.toLowerCase() ) > -1 || dress.desc.toLowerCase()
                                .indexOf( text.toLowerCase() ) > -1 ) {
                                return dress;
                            }
                        } );
                    this.set( 'filteredDresses', dresses );
                } else {
                    this.set( 'filteredDresses', this.get( 'dresses' ) );
                }
            }
        }
    } );
    DressKart.MenController = DressKart.BaseController.extend( {} );
    DressKart.WomenController = DressKart.BaseController.extend( {} );
    DressKart.KidsController = DressKart.BaseController.extend( {} );
    DressKart.ProductController = DressKart.BaseController.extend( {} );
    DressKart.ProductDetailController = Ember.ObjectController.extend( {
        needs: [ 'product' ],
        dress: null,
        actions: {
            addToCart: function () {
                var dress = this.get( 'dress' );
                var order = this.store.createRecord( DressKart.Order, {
                    pdtId: dress.id,
                    title: dress.title,
                    imageUrl: dress.imageUrl,
                    price: dress.price,
                    quantity: dress.quantity || 1
                } );
                order.save();
                this.send( 'showCart' );
            },
            showCart: function () {
                this.transitionToRoute( 'cart' );
            }
        }
    } );
    DressKart.CartController = Ember.ArrayController.extend( {
        items: [],
        actions: {}
    } );
} )( Ember, window, document );