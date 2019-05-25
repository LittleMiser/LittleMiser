//
//  MUltiPicsModel.h
//  FeedsAPP
//
//  Created by Yueyue on 2019/5/22.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HomeViewModel : NSObject

@property (nonatomic,copy) NSString *title;
@property (nonatomic,assign) int imageType;
@property (nonatomic,copy) NSString *leftImage;
@property (nonatomic,copy) NSString *middleImage;
@property (nonatomic,copy) NSString *rightImage;
@property (nonatomic,copy) NSString *info;

//自定义构造方法
-(id) initWithDict:(NSDictionary *)dict;

//类方法（规范）
+(id) newsWithDict:(NSDictionary *)dict;

@end

NS_ASSUME_NONNULL_END
